import { categories } from "@/data/words";
import { createSecretRound, generateRoomCode, SecretRoundAssignment } from "@/lib/gameLogic";

const ROOM_STORAGE_PREFIX = "imposter-online-room:";
const CLIENT_ID_KEY = "imposter-online-client-id";
const ROOM_CHANNEL_PREFIX = "imposter-online-room-channel:";

export type OnlineRoomPhase = "lobby" | "roles" | "discussion" | "voting" | "result";

export interface OnlineRoomPlayer extends SecretRoundAssignment {
  joinedAt: number;
  isHost: boolean;
}

export interface OnlineRoom {
  code: string;
  hostId: string;
  phase: OnlineRoomPhase;
  imposterCount: number;
  selectedCategories: string[];
  players: OnlineRoomPlayer[];
  votes: Record<string, string>;
  word: { en: string; mm: string } | null;
  imposterHint: string;
  imposterHintMm: string;
  createdAt: number;
  updatedAt: number;
}

function getRoomKey(code: string) {
  return `${ROOM_STORAGE_PREFIX}${code.toUpperCase()}`;
}

function broadcastRoomUpdate(code: string) {
  if (typeof window === "undefined" || typeof BroadcastChannel === "undefined") return;
  const channel = new BroadcastChannel(`${ROOM_CHANNEL_PREFIX}${code}`);
  channel.postMessage({ type: "updated", code });
  channel.close();
}

function persistRoom(room: OnlineRoom) {
  localStorage.setItem(getRoomKey(room.code), JSON.stringify({ ...room, updatedAt: Date.now() }));
  broadcastRoomUpdate(room.code);
}

export function getClientId() {
  const existing = window.sessionStorage.getItem(CLIENT_ID_KEY);
  if (existing) return existing;

  const created = crypto.randomUUID();
  window.sessionStorage.setItem(CLIENT_ID_KEY, created);
  return created;
}

export function readRoom(code: string) {
  const raw = localStorage.getItem(getRoomKey(code));
  if (!raw) return null;

  try {
    return JSON.parse(raw) as OnlineRoom;
  } catch {
    return null;
  }
}

export function createRoom(hostName: string, clientId: string) {
  let code = generateRoomCode();

  while (readRoom(code)) {
    code = generateRoomCode();
  }

  const room: OnlineRoom = {
    code,
    hostId: clientId,
    phase: "lobby",
    imposterCount: 1,
    selectedCategories: categories.map((category) => category.id),
    players: [
      {
        id: clientId,
        name: hostName.trim(),
        joinedAt: Date.now(),
        isHost: true,
        isImposter: false,
        hasViewed: false,
      },
    ],
    votes: {},
    word: null,
    imposterHint: "",
    imposterHintMm: "",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  persistRoom(room);
  return room;
}

export function joinRoom(code: string, playerName: string, clientId: string) {
  const room = readRoom(code);
  if (!room) return { error: "missing" as const };

  const normalizedName = playerName.trim();
  if (!normalizedName) return { error: "invalid-name" as const };

  const existingPlayer = room.players.find((player) => player.id === clientId);
  const nextPlayers = existingPlayer
    ? room.players.map((player) =>
        player.id === clientId ? { ...player, name: normalizedName } : player
      )
    : [
        ...room.players,
        {
          id: clientId,
          name: normalizedName,
          joinedAt: Date.now(),
          isHost: false,
          isImposter: false,
          hasViewed: false,
        },
      ];

  const nextRoom: OnlineRoom = {
    ...room,
    players: nextPlayers,
  };

  persistRoom(nextRoom);
  return { room: nextRoom };
}

export function leaveRoom(code: string, clientId: string) {
  const room = readRoom(code);
  if (!room) return;

  const remainingPlayers = room.players.filter((player) => player.id !== clientId);

  if (remainingPlayers.length === 0) {
    localStorage.removeItem(getRoomKey(code));
    broadcastRoomUpdate(code);
    return;
  }

  const nextHostId = room.hostId === clientId ? remainingPlayers[0].id : room.hostId;
  const nextRoom: OnlineRoom = {
    ...room,
    hostId: nextHostId,
    players: remainingPlayers.map((player) => ({
      ...player,
      isHost: player.id === nextHostId,
    })),
  };

  persistRoom(nextRoom);
}

export function updateRoom(code: string, updater: (room: OnlineRoom) => OnlineRoom | null) {
  const room = readRoom(code);
  if (!room) return null;

  const nextRoom = updater(room);
  if (!nextRoom) return null;

  persistRoom(nextRoom);
  return nextRoom;
}

export function startRoomGame(code: string) {
  return updateRoom(code, (room) => {
    if (room.players.length < 3) return room;

    const round = createSecretRound(
      room.players.map((player) => ({ id: player.id, name: player.name })),
      Math.min(room.imposterCount, Math.max(1, room.players.length - 1)),
      room.selectedCategories
    );

    return {
      ...room,
      phase: "roles",
      players: round.players.map((player) => {
        const existing = room.players.find((roomPlayer) => roomPlayer.id === player.id);
        return {
          ...player,
          joinedAt: existing?.joinedAt ?? Date.now(),
          isHost: room.hostId === player.id,
        };
      }),
      votes: {},
      word: round.word,
      imposterHint: round.imposterHint,
      imposterHintMm: round.imposterHintMm,
    };
  });
}

export function resetRoomToLobby(code: string) {
  return updateRoom(code, (room) => ({
    ...room,
    phase: "lobby",
    votes: {},
    word: null,
    imposterHint: "",
    imposterHintMm: "",
    players: room.players.map((player) => ({
      ...player,
      isImposter: false,
      hasViewed: false,
    })),
  }));
}

export function subscribeToRoom(code: string, onChange: () => void) {
  const normalizedCode = code.toUpperCase();

  const onStorage = (event: StorageEvent) => {
    if (event.key === getRoomKey(normalizedCode)) onChange();
  };

  window.addEventListener("storage", onStorage);

  let channel: BroadcastChannel | null = null;
  if (typeof BroadcastChannel !== "undefined") {
    channel = new BroadcastChannel(`${ROOM_CHANNEL_PREFIX}${normalizedCode}`);
    channel.addEventListener("message", onChange);
  }

  return () => {
    window.removeEventListener("storage", onStorage);
    channel?.close();
  };
}
