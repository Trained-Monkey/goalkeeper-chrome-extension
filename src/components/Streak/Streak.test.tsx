import { screen, render, waitFor, act } from '@testing-library/react';

import StreakInput from '../../interface/StreakInput';
import React from 'react';
import Streak from './Streak';
import { TYPES } from '../../constants/Goal';
import Goal from '../../interface/Goal';
import StreakStoredData from '../../interface/StreakStoredData';

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
    it("should by default has no streak", async () => {
        const mockFn = jest.spyOn(chrome.storage.local, "get");
        jest.spyOn(chrome.storage.local, "set").mockImplementation(()=> Promise.resolve({}));

        mockFn.mockImplementation(()=> Promise.resolve({}));

        const contextValue: StreakInput = {
            goals: dummyUnfinishedGoalsData,
        }

        render(<Streak {...contextValue} />);

        await waitFor(() => {
            expect(mockFn).toHaveBeenCalledTimes(1);
            expect(screen.queryByText(/[0-9]+/)).not.toBeInTheDocument();
        })
    })
    it("should not show a number when there is no streak", async () => {
        const mockFn = jest.spyOn(chrome.storage.local, "get");
        jest.spyOn(chrome.storage.local, "set").mockImplementation(()=> Promise.resolve({}));

        mockFn.mockImplementation(()=> Promise.resolve({counter: 0}));

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
        const mockGetter = jest.spyOn(chrome.storage.local, "get");
        const mockSetter = jest.spyOn(chrome.storage.local, "set");
        const mockGetterReturn: StreakStoredData = {
            counter: exampleStreak,
            lastCompleted: new Date().toString()
        }

        mockSetter.mockImplementation(()=> Promise.resolve({}));
        mockGetter.mockImplementation(()=> Promise.resolve(mockGetterReturn));

        const contextValue: StreakInput = {
            goals: dummyUnfinishedGoalsData,
        }

        render(<Streak {...contextValue} />);        

        await waitFor(async () => {
            expect(mockGetter).toHaveBeenCalledTimes(1);
            const element: HTMLElement = await screen.findByText(exampleStreak.toString());
            expect(element).toBeInTheDocument();
        })
    })

    it("should increment the streak count when all the goals today are done", async () => {
        const exampleStreak: number = 20;
        const mockGetter = jest.spyOn(chrome.storage.local, "get");
        const mockSetter = jest.spyOn(chrome.storage.local, "set");
        const mockGetterReturn: StreakStoredData = {
            counter: exampleStreak,
            lastCompleted: new Date().toString()
        }

        mockSetter.mockImplementation(()=> Promise.resolve({}));
        mockGetter.mockImplementation(()=> Promise.resolve(mockGetterReturn));

        const contextValue: StreakInput = {
            goals: dummyFinishedGoalsData,
        }

        render(<Streak {...contextValue} />);        

        // Test seems to take 10x as long when ran in the background sometimes
        // causing it to fail cause of timeout
        await waitFor(async () => {
            expect(mockGetter).toHaveBeenCalledTimes(1);
        })

        await waitFor(async () => {
            const element: HTMLElement = await screen.findByText((exampleStreak + 1).toString());
            expect(element).toBeInTheDocument();
        }, { timeout: 5000 })
    })
})