import { createContext } from "react";

const defaultStreak: StreakContextInput = {
    streakCounter: 0,
    setStreak: () => {},
    lastCompleted: new Date(),
    setLastCompleted: () => {}
};

export const StreakContext: React.Context<StreakContextInput> = createContext(defaultStreak);