// Tests for the functionality of the list of goals, handles the overall display
// and logic of setting goals to be down
// - List of goals should be rendered
// - Should be sorted by expiry, soon to expire -> top, done -> bottom
// - Goals should be removed from list when removal callback is ran

import { render } from '@testing-library/react';
import {screen } from "@testing-library/dom";
import GoalList from '../../components/GoalList';
import React from 'react';


describe('GoalList', () => {
    it('should contain the title', () => {
        render(<GoalList />);

        const elements: HTMLElement[] = screen.queryAllByText('Goal List');

        expect(elements.length).toBe(1);
        expect(elements[0].textContent).toBe('Goal List');
    })

    it('should render goals', () => {
        
    })

    it('should be sorted by expiry', () => {

    })

    it('should be able to remove goals', () => {

    })
})