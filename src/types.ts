import type Game from "./store/game";

export enum EvaluationStatus {
    Unknown = 0,
    Absent = 1,
    Present = 2,
    Correct = 3,
}

export enum GameState {
    InProgress = 0,
    Lose = 1,
    Win = 2,
}

export interface GameContext {
    getGame: () => Game;
}

export interface KeyPressMessage {
    message: { key: string };
}
