import { screen, render } from '@testing-library/react';
import Streak from './Streak';
import StreakInput from '../../interface/StreakInput';
import React from 'react';
import { StreakContext } from '../../context/StreakContext';

describe('Streak', () => {
    it("should not show a number when there is no streak", () => {
        const contextValue: StreakInput = {
            goals: [],
        }

        render(<Streak {...contextValue}/>);
        expect(screen.queryByText(/[0-9]+/)).not.toBeInTheDocument();
    })

    it("should not show the streak count when there is a streak", () => {
        const exampleStreak: number = 20;
        const contextValue: StreakInput = {
            goals: [],
        }

        render(<Streak {...contextValue}/>);
        expect(screen.getByText(exampleStreak.toString())).toBeInTheDocument();
    })
})