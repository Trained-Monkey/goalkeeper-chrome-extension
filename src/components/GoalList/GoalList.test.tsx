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

function generateTestData(): GoalInput[] {
    let result = [];
    const emptyCallback = () => {}
    result.push({
        name: 'Goal #1',
        type: TYPES.DAILY,
        lastCompleted: new Date(),
        deletionCallback: emptyCallback,
        finishedCallback: emptyCallback
    })

    result.push({
        name: 'Goal #2',
        type: TYPES.WEEKLY,
        lastCompleted: new Date(),
        deletionCallback: emptyCallback,
        finishedCallback: emptyCallback
    })

    result.push({
        name: 'Goal #3',
        type: TYPES.FORTNIGHTLY,
        lastCompleted: new Date(),
        deletionCallback: emptyCallback,
        finishedCallback: emptyCallback
    })

    result.push({
        name: 'Goal #4',
        type: TYPES.DAILY,
        lastCompleted: new Date(Date.now() - (20 * 60 * 60 * 1000)),
        deletionCallback: emptyCallback,
        finishedCallback: emptyCallback
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
        const testData: GoalInput[] = generateTestData();

        render(<GoalList goals={testData}/>)

        const elements: HTMLElement[] = screen.getAllByText(/Goal #/);
        
        expect(elements.length).toBe(testData.length);
    })

    it('should be sorted by expiry', () => {
        const testData: GoalInput[] = generateTestData();

        render(<GoalList goals={testData}/>)

        const goal4: HTMLElement = screen.getByText(/Goal #4/);
        const goal3: HTMLElement = screen.getByText(/Goal #3/);
        const goal2: HTMLElement = screen.getByText(/Goal #2/);
        
        expect(goal4.compareDocumentPosition(goal2)).toBe(2);
        expect(goal4.compareDocumentPosition(goal3)).toBe(2);
        expect(goal2.compareDocumentPosition(goal3)).toBe(2);
    })

    it('should be able to remove goals', () => {
        const testData: GoalInput[] = generateTestData();

        render(<GoalList goals={testData}/>)

        const buttons: HTMLElement[] = screen.queryAllByRole('button');
        let elements: HTMLElement[];
        for (let i = 0; i < buttons.length; i++){
            userEvent.click(buttons[i]);
            elements = screen.queryAllByText(/Goal #/);
            expect(elements.length).toBe(testData.length - i - 1);
        }
    })

    it('should remove the correct goal', () => {
        const testData: GoalInput[] = generateTestData();

        render(<GoalList goals={testData}/>)

        let goal3: HTMLElement = screen.getByText('Drink water');
        const button: HTMLElement = within(goal3).getByRole('button');
        userEvent.click(button);

        expect(screen.queryByText('Drink water')).not.toBeInTheDocument();


    })
})