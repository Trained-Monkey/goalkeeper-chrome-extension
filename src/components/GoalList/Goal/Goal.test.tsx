// Element containing the name of the goal, when it expires as well as its 
// duration
// - 
import { screen, render } from "@testing-library/react";
import React from "react";
import userEvent from '@testing-library/user-event'
// Components
import Goal from "./Goal";
// Interfaces
import { GoalInput } from "./Goal";
import { TYPES } from "../../../constants/Goal";

describe("Goal", () => {
  it("shows a name, expiry and duration", () => {
    const currentDate = new Date();
    const testData: GoalInput = {
      name: "Drink water",
      lastCompleted: currentDate,
      type: TYPES.DAILY,
      deletionCallback: () => { },
      finishedCallback: () => { }
    }

    render(<Goal {...testData} />);

    expect(screen.getByText(/Drink water/)).toBeInTheDocument();
    expect(screen.getByText(/Daily/)).toBeInTheDocument();
    expect(screen.getByText(/in 23 hours/)).toBeInTheDocument();
  })

  it("can show hourly expiry", () => {
    const twentyHoursAgo = new Date(Date.now() - (20 * 60 * 60 * 1000));
    const testData: GoalInput = {
      name: "Drink water",
      lastCompleted: twentyHoursAgo,
      type: TYPES.DAILY,
      deletionCallback: () => { },
      finishedCallback: () => { }
    }

    render(<Goal {...testData} />);

    expect(screen.getByText("Drink water")).toBeInTheDocument();
    expect(screen.getByText("Daily")).toBeInTheDocument();
    expect(screen.getByText(/in 3 hours/)).toBeInTheDocument();
  })

  it("can show weekly expiry", () => {
    const currentDate = new Date();
    const testData: GoalInput = {
      name: "Drink water",
      lastCompleted: currentDate,
      type: TYPES.WEEKLY,
      deletionCallback: () => { },
      finishedCallback: () => { }
    }

    render(<Goal {...testData} />);

    expect(screen.getByText("Drink water")).toBeInTheDocument();
    expect(screen.getByText("Weekly")).toBeInTheDocument();
    expect(screen.getByText(/in 6 days/)).toBeInTheDocument();
  })

  it("can show forntnightly expiry", () => {
    const currentDate = new Date();
    const testData: GoalInput = {
      name: "Drink water",
      lastCompleted: currentDate,
      type: TYPES.FORTNIGHTLY,
      deletionCallback: () => { },
      finishedCallback: () => { }
    }

    render(<Goal {...testData} />);

    expect(screen.getByText("Drink water")).toBeInTheDocument();
    expect(screen.getByText("Fortnightly")).toBeInTheDocument();
    expect(screen.getByText(/in 1 week/)).toBeInTheDocument();
  })

  it("can show monthly expiry", () => {
    const currentDate = new Date();
    const testData: GoalInput = {
      name: "Drink water",
      lastCompleted: currentDate,
      type: TYPES.MONTHLY,
      deletionCallback: () => { },
      finishedCallback: () => { }
    }

    render(<Goal {...testData} />);

    expect(screen.getByText("Drink water")).toBeInTheDocument();
    expect(screen.getByText("Monthly")).toBeInTheDocument();
    expect(screen.getByText(/in 1 month/)).toBeInTheDocument();
  })

  it("has a delete button", () => {
    const currentDate = new Date();
    const testData: GoalInput = {
      name: "Drink water",
      lastCompleted: currentDate,
      type: TYPES.DAILY,
      deletionCallback: jest.fn(() => { }),
      finishedCallback: () => { }
    }

    render(<Goal {...testData} />);
    const button = screen.getByRole('button', { name: /Delete/, hidden: true });

    userEvent.click(button);

    expect(testData.deletionCallback.mock.calls).toHaveLength(1);
  })

  it("has a finished button", () => {
    const currentDate = new Date();
    const testData: GoalInput = {
      name: "Drink water",
      lastCompleted: currentDate,
      type: TYPES.DAILY,
      deletionCallback: () => { },
      finishedCallback: jest.fn(() => { })
    }

    render(<Goal {...testData} />);
    const button = screen.getByRole('button', { name: /Done/ });

    userEvent.click(button);

    expect(testData.finishedCallback.mock.calls).toHaveLength(1);
  })

  test('finished goals should not have a submit button', () => {
    const nextExpiry = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    const testData: GoalInput = {
      name: "Drink water",
      lastCompleted: nextExpiry,
      type: TYPES.DAILY,
      deletionCallback: () => { },
      finishedCallback: jest.fn(() => { })
    }

    render(<Goal {...testData} />);

    expect(screen.queryByRole('button', { name: /Done/ }))
      .not.toBeInTheDocument();
  })
})