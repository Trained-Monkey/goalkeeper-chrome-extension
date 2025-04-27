interface StreakContextInput {
    streakCounter: number,
    setStreak: React.Dispatch<React.SetStateAction<number>>,
    lastCompleted: Date,
    setLastCompleted: React.Dispatch<React.SetStateAction<Date>>,
}