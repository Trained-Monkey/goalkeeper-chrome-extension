// e2e tests for the app
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import React from "react";
import Goal from './interface/Goal';
import { TYPES } from './constants/Goal';

const generateGoalData = () => {
  let result = [];

  const unfinishedDaily = {
    name: 'Unfinished daily goal',
    type: TYPES.DAILY,
    lastCompleted: new Date().toString()
  }
  result.push(unfinishedDaily);

  const unfinishedWeekly = {
    name: 'Unfinished weekly goal',
    type: TYPES.WEEKLY,
    lastCompleted: new Date().toString()
  }
  result.push(unfinishedWeekly);

  const finishedDaily = {
    name: 'Finished daily goal',
    type: TYPES.DAILY,
    lastCompleted: new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toString()
  }
  result.push(finishedDaily);

  const finishedWeekly = {
    name: 'Finished weekly goal',
    type: TYPES.WEEKLY,
    lastCompleted: new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toString()
  }
  result.push(finishedWeekly);


  return result;
}

describe('App', () => {

  it('renders a stored list of goals and streaks', async () => {
    const storageGetMock = jest.spyOn(chrome.storage.local, "get");
    const storageSetMock = jest.spyOn(chrome.storage.local, "set");

    storageGetMock.mockImplementation(() => Promise.resolve({
      goals: generateGoalData(),
      counter: 20
    }));
    storageSetMock.mockImplementation(() => Promise.resolve({}));

    render(<App />);
    await waitFor(() => {
      expect(screen.getByText(/Unfinished daily/)).toBeInTheDocument();
      expect(screen.getByText(/Finished daily/)).toBeInTheDocument();
      expect(screen.getByText(/Finished weekly/)).toBeInTheDocument();
      expect(screen.getByText(/Unfinished weekly/)).toBeInTheDocument();
      expect(screen.getByText(/20/)).toBeInTheDocument();
    })
  })

  it('lets user add goals', async () => {
    const storageGetMock = jest.spyOn(chrome.storage.local, "get");
    const storageSetMock = jest.spyOn(chrome.storage.local, "set");

    storageGetMock.mockImplementation(() => Promise.resolve({
      goals: generateGoalData(),
      counter: 20
    }));
    storageSetMock.mockImplementation(() => Promise.resolve({}));
    render(<App />);
    const addGoalButton: HTMLElement = screen.getByRole('button', { name: /Add Goal/ });

    fireEvent.click(addGoalButton);

    // Wait for modal to load
    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    })

    const textbox: HTMLElement = screen.getByRole('textbox', { name: /Goal name/ });
    const dropdown: HTMLElement = screen.getByRole('combobox', { name: /Goal to be completed/ });
    const date: HTMLElement = screen.getByRole('textbox', { name: /Start on/ });

    fireEvent.change(textbox, { target: { value: 'Test goal' } });
    fireEvent.change(dropdown, { target: { value: TYPES.DAILY } });
    fireEvent.change(date, { target: { value: `2/1/2025` } })
    const button: HTMLElement = screen.getByRole('button', { name: /Add goal/ });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('Test goal')).toBeInTheDocument();
    })
  })

  it('lets users mark goals as completed and delete goals', async () => {
    const storageGetMock = jest.spyOn(chrome.storage.local, "get");
    const storageSetMock = jest.spyOn(chrome.storage.local, "set");

    storageGetMock.mockImplementation(() => Promise.resolve({
      goals: generateGoalData(),
      counter: 20
    }));
    storageSetMock.mockImplementation(() => Promise.resolve({}));
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Unfinished daily/)).toBeInTheDocument();
    })

    // Below test kind of gross but not sure how to find a button corresponds to
    // a specified goal, might have to look if we should select by className 
    // first
    const unfinishedDailyParent = screen.getByText(/Unfinished daily/)
      .parentElement?.parentElement;
    const doneButton = unfinishedDailyParent!.querySelector('[name="submit-button"]');
    expect(doneButton).not.toBeNull();

    fireEvent.click(doneButton!);

    await waitFor(() => {
      let unfinishedDaily = screen.getByText(/Unfinished daily/);
      let finishedDaily = screen.getByText(/Finished daily/);
      expect(unfinishedDaily.compareDocumentPosition(finishedDaily)).toBe(Node.DOCUMENT_POSITION_PRECEDING);
    })

    // Same issue as above
    const unfinishedWeeklyParent = screen.getByText(/Unfinished weekly/)
      .parentElement?.parentElement;

    const deleteButton = unfinishedWeeklyParent!.querySelector('[name="delete-button"]');
    expect(deleteButton).not.toBeNull();

    fireEvent.click(deleteButton!);
    await waitFor(() => {
      expect(screen.queryByText(/Unfinished weekly/)).not.toBeInTheDocument();
    })
  })
});
