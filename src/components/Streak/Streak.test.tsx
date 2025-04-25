import { screen, render } from '@testing-library/react';
import Streak from './Streak';
import StreakInput from '../../interface/StreakInput';
import React from 'react';


describe('Streak', () => {
    it("should not show a number when there is no streak", () => {
        const testData: StreakInput = {
            streakCounter: 0
        }

        render(<Streak {...testData}/>);

        expect(screen.queryByText(/[0-9]+/)).not.toBeInTheDocument();
    })

    it("should not show the streak count when there is a streak", () => {
        const exampleStreak: number = 20;
        const testData: StreakInput = {
            streakCounter: exampleStreak
        }

        render(<Streak {...testData}/>);
        expect(screen.getByText(exampleStreak.toString())).toBeInTheDocument();
    })
})