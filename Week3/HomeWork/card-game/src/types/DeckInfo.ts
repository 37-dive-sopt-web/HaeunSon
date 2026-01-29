export interface Card {
  id: string;
  value: number;
}

export type Level = 1 | 2 | 3;

export interface DeckInfo {
    status: "notReady" | "ready";
    data: Card[] | null;
    level: Level;
  }