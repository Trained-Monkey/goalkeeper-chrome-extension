import { screen, render, waitFor, act } from '@testing-library/react';

import StreakInput from '../../interface/StreakInput';
import React from 'react';
import Streak from './Streak';
import { TYPES } from '../../constants/Goal';
import Goal from '../../interface/Goal';

const dummyUnfinishedGoalsData: Goal[] = [
    {
        name: 'Drink water',
        type: TYPES.DAILY,
        lastCompleted: new Date(Date.now() - 10000)
    }
]

const dummyFinishedGoalsData: Goal[] = [
    {
        name: 'Drink water',
        type: TYPES.DAILY,
        lastCompleted: new Date(Date.now() + 24 * 60 * 60 * 1000)
    }
]

describe('Streak', () => {
    it("should not show a number when there is no streak", async () => {
        const mockFn = jest.spyOn(chrome.storage.local, "get");
        // @ts-ignore
        mockFn.mockResolvedValue({streakCounter: 0});
        const contextValue: StreakInput = {
            goals: dummyUnfinishedGoalsData,
        }

        render(<Streak {...contextValue} />);

        await waitFor(() => {
            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(screen.queryByText(/[0-9]+/)).not.toBeInTheDocument();
        })
    })

    it("should show the streak count when there is a streak", async () => {
        const exampleStreak: number = 20;
        const mockFn = jest.spyOn(chrome.storage.local, "get");
        //@ts-ignore
        mockFn.mockResolvedValue({streakCounter: exampleStreak});
        const contextValue: StreakInput = {
            goals: dummyUnfinishedGoalsData,
        }

        render(<Streak {...contextValue} />);        

        await waitFor(async () => {
            expect(mockFn).toHaveBeenCalledTimes(1);
            const element: HTMLElement = await screen.findByText(exampleStreak.toString());
            expect(element).toBeInTheDocument();
        })
    })

    it("should increment the streak count when all the goals today are done", async () => {
        const exampleStreak: number = 20;
        const mockFn = jest.spyOn(chrome.storage.local, "get");
        //@ts-ignore
        mockFn.mockResolvedValue({streakCounter: exampleStreak});
        const contextValue: StreakInput = {
            goals: dummyFinishedGoalsData,
        }

        render(<Streak {...contextValue} />);        

        await waitFor(async () => {
            expect(mockFn).toHaveBeenCalledTimes(1);
            const element: HTMLElement = await screen.findByText((exampleStreak + 1).toString());
            expect(element).toBeInTheDocument();
        })
    })
})