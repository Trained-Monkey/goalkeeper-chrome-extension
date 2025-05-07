// Tests for the functionality of the list of goals, handles the overall display
// and logic of setting goals to be down
// - Should be sorted by expiry, soon to expire -> top, done -> bottom
import { render } from '@testing-library/react';
import { screen } from "@testing-library/dom";
import GoalList from './GoalList';
import React from 'react';
import { GoalInput } from './Goal/Goal';
import { TYPES } from '../../constants/Goal';

function generateTestData() {
  let result: GoalInput[] = [];
  result.push({
    name: 'Unfinished weekly goal',
    type: TYPES.WEEKLY,
    lastCompleted: new Date(),
    deletionCallback: () => { },
    finishedCallback: () => { }
  })

  result.push({
    name: 'Unfinished daily goal',
    type: TYPES.DAILY,
    lastCompleted: new Date(),
    deletionCallback: () => { },
    finishedCallback: () => { }
  })

  result.push({
    name: 'Unfinished fortnightly goal',
    type: TYPES.FORTNIGHTLY,
    lastCompleted: new Date(),
    deletionCallback: () => { },
    finishedCallback: () => { }
  })

  result.push({
    name: 'Finished daily',
    type: TYPES.DAILY,
    lastCompleted: new Date(Date.now() + (20 * 60 * 60 * 1000)),
    deletionCallback: () => { },
    finishedCallback: () => { }
  })

  return result;
}

describe('GoalList', () => {
  it('should render goals in sorted order', () => {
    const testData = generateTestData();

    render(<GoalList goals={testData} />);

    const unfinishedDaily = screen.getByText(/Unfinished daily/);
    const finishedDaily = screen.getByText(/Finished daily/);
    const unfinishedWeekly = screen.getByText(/Unfinished weekly/);
    const unfinishedFortnightly = screen.getByText(/Unfinished fortnightly/);

    expect(unfinishedDaily.compareDocumentPosition(unfinishedWeekly))
      .toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(unfinishedWeekly.compareDocumentPosition(unfinishedFortnightly))
      .toBe(Node.DOCUMENT_POSITION_FOLLOWING);
    expect(unfinishedFortnightly.compareDocumentPosition(finishedDaily))
      .toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  })
})
