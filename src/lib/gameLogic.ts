import { categories, WordPair, Category } from "@/data/words";

export interface Player {
  id: number;
  name: string;
  isImposter: boolean;
  hasViewed: boolean;
}

export interface GameSession {
  sessionId: string;
  players: Player[];
  word: WordPair;
  imposterHint: string;
  imposterHintMm: string;
  currentPlayerIndex: number;
  phase: "viewing" | "discussion" | "voting" | "result";
  selectedCategories: string[];
  votes: Record<number, number>; // voterId -> votedPlayerId
}

export interface SecretRoundParticipant {
  id: string;
  name: string;
}

export interface SecretRoundAssignment extends SecretRoundParticipant {
  isImposter: boolean;
  hasViewed: boolean;
}

function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// function getHintWord(word: WordPair, allWords: WordPair[]): { en: string; mm: string } {
//   // Get a related hint from the same category pool (different word)
//   const otherWords = allWords.filter((w) => w.en !== word.en);
//   if (otherWords.length === 0) return { en: "???", mm: "???" };
//   const hint = otherWords[Math.floor(Math.random() * otherWords.length)];
//   return { en: hint.en, mm: hint.mm };
// }

// function getHintWord(word: WordPair): { en: string; mm: string } {
//   if (!word.hints || word.hints.length === 0) {
//     return { en: "Think Yourself", mm:"ကိုယ့်ဘာသာ စဉ်းစား" };
//   }
//   const hint = word.hints[Math.floor(Math.random() * word.hints.length)];
//   return { en: hint.en, mm: hint.mm };
// }

// export function createGameSession(
//   playerNames: string[],
//   imposterCount: number,
//   selectedCategoryIds: string[]
// ): GameSession {
//   const selectedCats = categories.filter((c) => selectedCategoryIds.includes(c.id));
//   const allWords = selectedCats.flatMap((c) => c.words);
//   const word = allWords[Math.floor(Math.random() * allWords.length)];
//   const hint = getHintWord(word);

//   const imposterIndices = new Set<number>();
//   while (imposterIndices.size < imposterCount) {
//     imposterIndices.add(Math.floor(Math.random() * playerNames.length));
//   }

//   const players: Player[] = playerNames.map((name, i) => ({
//     id: i,
//     name,
//     isImposter: imposterIndices.has(i),
//     hasViewed: false,
//   }));

//   return {
//     sessionId: generateSessionId(),
//     players: shuffleArray(players),
//     word,
//     imposterHint: hint.en,
//     imposterHintMm: hint.mm,
//     currentPlayerIndex: 0,
//     phase: "viewing",
//     selectedCategories: selectedCategoryIds,
//     votes: {},
//   };
// }

function createHintGenerator(word: WordPair) {
  let shuffled = [...word.hints].sort(() => Math.random() - 0.5);
  let index = 0;

  return function nextHint() {
    if (shuffled.length === 0) {
      return { en: "Think Yourself", mm: "ကိုယ့်ဘာသာ စဉ်းစား" };
    }
    if (index >= shuffled.length) {
      shuffled = [...word.hints].sort(() => Math.random() - 0.5);
      index = 0;
    }
    const hint = shuffled[index++];
    return { en: hint.en, mm: hint.mm };
  };
}

function createRoundDetails(selectedCategoryIds: string[]) {
  const selectedCats = categories.filter((c) => selectedCategoryIds.includes(c.id));
  const allWords = selectedCats.flatMap((c) => c.words);
  const word = allWords[Math.floor(Math.random() * allWords.length)];
  const hintGenerator = createHintGenerator(word);
  const hint = hintGenerator();

  return {
    word,
    imposterHint: hint.en,
    imposterHintMm: hint.mm,
  };
}

export function createSecretRound(
  participants: SecretRoundParticipant[],
  imposterCount: number,
  selectedCategoryIds: string[]
) {
  const { word, imposterHint, imposterHintMm } = createRoundDetails(selectedCategoryIds);

  const imposterIndices = new Set<number>();
  while (imposterIndices.size < imposterCount) {
    imposterIndices.add(Math.floor(Math.random() * participants.length));
  }

  const players: SecretRoundAssignment[] = participants.map((participant, index) => ({
    ...participant,
    isImposter: imposterIndices.has(index),
    hasViewed: false,
  }));

  return {
    players: shuffleArray(players),
    word,
    imposterHint,
    imposterHintMm,
  };
}

export function createGameSession(
  playerNames: string[],
  imposterCount: number,
  selectedCategoryIds: string[]
): GameSession {
  const round = createSecretRound(
    playerNames.map((name, index) => ({ id: String(index), name })),
    imposterCount,
    selectedCategoryIds
  );

  const players: Player[] = round.players.map((player) => ({
    id: Number(player.id),
    name: player.name,
    isImposter: player.isImposter,
    hasViewed: player.hasViewed,
  }));

  return {
    sessionId: generateSessionId(),
    players,
    word: round.word,
    imposterHint: round.imposterHint,
    imposterHintMm: round.imposterHintMm,
    currentPlayerIndex: 0,
    phase: "viewing",
    selectedCategories: selectedCategoryIds,
    votes: {},
    // You can store the generator if you want to call it later:
    // hintGenerator
  };
}

export function getMaxImposters(playerCount: number): number {
  return Math.max(1, playerCount - 1);
}

export function generateRoomCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
