// // Testing streak component that displays the number of consecutive days in 
// // which all goals have been completed
// // - Tests it can correctly read data from chrome API
// // - Correctly increments streak and decreases streak based on goals done
// // - It correctly doesnt show a streak when there is no streak
// import { screen, render, waitFor } from '@testing-library/react';
// import React from 'react';
// // Componenents
// import Streak, { StreakInput } from './Streak';
// // Interfaces
// import Goal from '../../interface/Goal';
// import { TYPES } from '../../constants/Goal';
// import StreakStoredData from '../../interface/StreakStoredData';

// const dummyUnfinishedGoalsData: Goal[] = [
//   {
//     name: 'Drink water',
//     type: TYPES.DAILY,
//     lastCompleted: new Date(Date.now() - 10000)
//   }
// ]

// const dummyFinishedGoalsData: Goal[] = [
//   {
//     name: 'Drink water',
//     type: TYPES.DAILY,
//     lastCompleted: new Date(Date.now() + 24 * 60 * 60 * 1000)
//   }
// ]
// describe('Streak', () => {
//   it("should by default have no streak and not show a number", async () => {
//     const mockGetter = jest.spyOn(chrome.storage.local, "get");
//     const mockSetter = jest.spyOn(chrome.storage.local, "set");
//     mockSetter.mockImplementation(() => Promise.resolve({}));
//     mockGetter.mockImplementation(() => Promise.resolve({}));

//     const contextValue: StreakInput = {
//       goals: dummyUnfinishedGoalsData,
//     }

//     render(<Streak {...contextValue} />);

//     await waitFor(() => {
//       expect(mockGetter).toHaveBeenCalledTimes(1);
//       expect(screen.queryByText(/[0-9]+/)).not.toBeInTheDocument();
//     })
//   })

//   it("should show the streak count when there is a streak", async () => {
//     const exampleStreak: number = 20;
//     const mockGetter = jest.spyOn(chrome.storage.local, "get");
//     const mockSetter = jest.spyOn(chrome.storage.local, "set");
//     const mockGetterReturn: StreakStoredData = {
//       counter: exampleStreak,
//       lastCompleted: new Date().toString()
//     }

//     mockSetter.mockImplementation(() => Promise.resolve({}));
//     mockGetter.mockImplementation(() => Promise.resolve(mockGetterReturn));

//     const contextValue: StreakInput = {
//       goals: dummyUnfinishedGoalsData,
//     }

//     render(<Streak {...contextValue} />);

//     await waitFor(async () => {
//       expect(mockGetter).toHaveBeenCalledTimes(1);
//       const element: HTMLElement = await screen.findByText(exampleStreak.toString());
//       expect(element).toBeInTheDocument();
//     })
//   })

//   it("should increment the streak count when all the goals today are done", async () => {
//     const exampleStreak: number = 20;
//     const mockGetter = jest.spyOn(chrome.storage.local, "get");
//     const mockSetter = jest.spyOn(chrome.storage.local, "set");
//     const mockGetterReturn: StreakStoredData = {
//       counter: exampleStreak,
//       lastCompleted: new Date().toString()
//     }

//     mockSetter.mockImplementation(() => Promise.resolve({}));
//     mockGetter.mockImplementation(() => Promise.resolve(mockGetterReturn));

//     const contextValue: StreakInput = {
//       goals: dummyFinishedGoalsData,
//     }

//     render(<Streak {...contextValue} />);

//     await waitFor(async () => {
//       expect(mockGetter).toHaveBeenCalledTimes(1);
//     })

//     await waitFor(async () => {
//       const element: HTMLElement = await screen.findByText((exampleStreak + 1).toString());
//       expect(element).toBeInTheDocument();
//     }, { timeout: 5000 })
//   })

//   it ("resets streak after missing one day", async () => {
//     const exampleStreak: number = 20;
//     const mockGetter = jest.spyOn(chrome.storage.local, "get");
//     const mockSetter = jest.spyOn(chrome.storage.local, "set");
//     const mockGetterReturn: StreakStoredData = {
//       counter: exampleStreak,
//       lastCompleted: new Date(new Date().getTime() - 48 * 60 * 60 * 1000).toString()
//     }

//     mockSetter.mockImplementation(() => Promise.resolve({}));
//     mockGetter.mockImplementation(() => Promise.resolve(mockGetterReturn));

//     const contextValue: StreakInput = {
//       goals: dummyUnfinishedGoalsData,
//     }

//     render(<Streak {...contextValue} />);

//     await waitFor(() => {
//       expect(mockGetter).toHaveBeenCalledTimes(1);
//       expect(screen.queryByText(/[0-9]+/)).not.toBeInTheDocument();
//     })
//   })
// })