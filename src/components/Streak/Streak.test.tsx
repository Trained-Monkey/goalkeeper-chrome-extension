import { screen, render, waitFor, act } from '@testing-library/react';

import StreakInput from '../../interface/StreakInput';
import React from 'react';
import { log, error} from 'console';

import Streak from './Streak';



describe('Streak', () => {
    it("should not show a number when there is no streak", async () => {
        const mockFn = jest.spyOn(chrome.storage.local, "get");
        // @ts-ignore
        mockFn.mockResolvedValue({streakCounter: 0});
        const contextValue: StreakInput = {
            goals: [],
        }

        render(<Streak {...contextValue} />);
        const promise = mockFn.mock.results[0].value;
        await act(async () => {
            await promise;
        })
        waitFor(() => {
            expect(screen.queryByText(/1/)).toBeInTheDocument();
        })
        
    })

    it("should not show the streak count when there is a streak", async () => {
        const exampleStreak: number = 20;
        const mockFn = jest.spyOn(chrome.storage.local, "get");
        //@ts-ignore
        mockFn.mockResolvedValue({streakCounter: exampleStreak});
        const contextValue: StreakInput = {
            goals: [],
        }

        render(<Streak {...contextValue} />);
        const promise = mockFn.mock.results[0].value;
        await act(async () => {
            await promise;
        })
        
        expect(screen.getByText((exampleStreak + 1).toString())).toBeInTheDocument();
    })
})