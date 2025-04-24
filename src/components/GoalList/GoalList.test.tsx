// Tests for the functionality of the list of goals, handles the overall display
// and logic of setting goals to be down
// - List of goals should be rendered
// - Should be sorted by expiry, soon to expire -> top, done -> bottom
// - Goals should be removed from list when removal callback is ran

import { render } from '@testing-library/react';
import {screen, within } from "@testing-library/dom";
import GoalList from './GoalList';
import React from 'react';
import GoalInput from '../../interface/GoalInput';
import { TYPES } from '../../constants/Goal';
import userEvent from '@testing-library/user-event';

function generateTestData() {
    let result = [];
    const emptyCallback = () => {}
    result.push({
        name: 'Goal #1',
        type: TYPES.DAILY,
        lastCompleted: new Date(),
    })

    result.push({
        name: 'Goal #2',
        type: TYPES.WEEKLY,
        lastCompleted: new Date(),
    })

    result.push({
        name: 'Goal #3',
        type: TYPES.FORTNIGHTLY,
        lastCompleted: new Date(),
    })

    result.push({
        name: 'Goal #4',
        type: TYPES.DAILY,
        lastCompleted: new Date(Date.now() - (20 * 60 * 60 * 1000)),
    })

    return result;
}


describe('GoalList', () => {
    it('should contain the title', () => {
        render(<GoalList goals={[]}/>);

        const elements: HTMLElement[] = screen.queryAllByText(/Goal/);

        expect(elements.length).toBe(1);
        expect(elements[0].textContent).toBe('Goal List');
    })

    it('should render goals', () => {
        const testData = generateTestData();

        render(<GoalList goals={testData}/>)

        const elements: HTMLElement[] = screen.getAllByText(/Goal #/);
        
        expect(elements.length).toBe(testData.length);
    })

    it('should be sorted by expiry', () => {
        const testData = generateTestData();

        render(<GoalList goals={testData}/>)

        const goal4: HTMLElement = screen.getByText(/Goal #4/);
        const goal3: HTMLElement = screen.getByText(/Goal #3/);
        const goal2: HTMLElement = screen.getByText(/Goal #2/);
        
        expect(goal4.compareDocumentPosition(goal2))
            .toBe(Node.DOCUMENT_POSITION_FOLLOWING);
        expect(goal4.compareDocumentPosition(goal3))
            .toBe(Node.DOCUMENT_POSITION_FOLLOWING);
        expect(goal2.compareDocumentPosition(goal3))
            .toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    })

    it('should be able to remove goals', () => {
        const testData = generateTestData();

        render(<GoalList goals={testData}/>)

        const buttons: HTMLElement[] = screen.queryAllByRole('button');
        let elements: HTMLElement[];
        for (let i = 0; i < buttons.length; i++){
            userEvent.click(buttons[i]);
            elements = screen.queryAllByText(/Goal #/);
            expect(elements.length).toBe(testData.length - i - 1);
        }
    })

    // Not sure if there is a better way to do test, could easily break if
    // order of elements is changed. Want to find the button corresponding to
    // a goal and simulate a click on it and ensure the correct goal is removed.
    it('should remove the correct goal', () => {
        const testData = generateTestData();

        render(<GoalList goals={testData}/>)

        let goal3: HTMLElement = screen.getByText('Goal #3');
        const parent: HTMLElement | null = goal3.parentElement;

        // Feels kind of hacky to assert parent is not null
        if (parent === null){
            expect(parent).not.toBeNull();
            return;
        }

        const button: HTMLElement = within(parent).getByRole('button', {
            name: /Delete/
        });
        userEvent.click(button);

        expect(screen.queryByText('Goal #3')).not.toBeInTheDocument();
    })

    // Not sure if there is a better way to do test, could easily break if
    // order of elements is changed. Want to find the button corresponding to
    // a goal and simulate a click on it and ensure the correct goal at the bottom.
    it('should put goal at bottom when finished', () => {
        const testData = generateTestData();

        render(<GoalList goals={testData}/>)

        let goal4: HTMLElement = screen.getByText('Goal #4');
        const parent: HTMLElement | null = goal4.parentElement;

        // Feels kind of hacky to assert parent is not null
        if (parent === null){
            expect(parent).not.toBeNull();
            return;
        }

        const button: HTMLElement = within(parent).getByRole('button', {
            name: /Done/
        });
        userEvent.click(button);
        goal4 = screen.getByText(/Goal #4/);
        const goal3: HTMLElement = screen.getByText(/Goal #3/);

        expect(goal4.compareDocumentPosition(goal3))
            .toBe(Node.DOCUMENT_POSITION_PRECEDING);
    })
})