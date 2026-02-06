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

function getHintWord(word: WordPair, allWords: WordPair[]): { en: string; mm: string } {
  // Get a related hint from the same category pool (different word)
  const otherWords = allWords.filter((w) => w.en !== word.en);
  if (otherWords.length === 0) return { en: "???", mm: "???" };
  const hint = otherWords[Math.floor(Math.random() * otherWords.length)];
  return { en: hint.en, mm: hint.mm };
}

export function createGameSession(
  playerNames: string[],
  imposterCount: number,
  selectedCategoryIds: string[]
): GameSession {
  const selectedCats = categories.filter((c) => selectedCategoryIds.includes(c.id));
  const allWords = selectedCats.flatMap((c) => c.words);
  const word = allWords[Math.floor(Math.random() * allWords.length)];
  const hint = getHintWord(word, allWords);

  const imposterIndices = new Set<number>();
  while (imposterIndices.size < imposterCount) {
    imposterIndices.add(Math.floor(Math.random() * playerNames.length));
  }

  const players: Player[] = playerNames.map((name, i) => ({
    id: i,
    name,
    isImposter: imposterIndices.has(i),
    hasViewed: false,
  }));

  return {
    sessionId: generateSessionId(),
    players: shuffleArray(players),
    word,
    imposterHint: hint.en,
    imposterHintMm: hint.mm,
    currentPlayerIndex: 0,
    phase: "viewing",
    selectedCategories: selectedCategoryIds,
    votes: {},
  };
}

export function getMaxImposters(playerCount: number): number {
  if (playerCount <= 4) return 1;
  if (playerCount <= 8) return 2;
  if (playerCount <= 12) return 3;
  return 4;
}

export function generateRoomCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
