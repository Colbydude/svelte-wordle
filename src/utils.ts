import { answers } from "./game/words";

/**
 * @TEMP Means of getting today's word. Just going to use random for now,
 * so every refresh will be a new word.
 */
export const getDailyWord = () => {
    return answers[Math.floor(Math.random() * answers.length)];
};
