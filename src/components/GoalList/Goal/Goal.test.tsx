// Testing element that contains description about the goal
// - It should display a done button if the goal is to be completed
// - It should display an undo button if the goal is already completed
import { screen, render } from "@testing-library/react";
import React from "react";
// Components
import Goal from "./Goal";
// Interfaces
import { GoalInput } from "./Goal";
import { TYPES } from "../../../constants/Goal";

describe("Goal", () => {
  it("goals not yet completed renders with a done button", () => {
    const msPerDay = 24 * 60 * 60 * 1000;
    const yesterday: Date = new Date(new Date().getTime() - msPerDay);
    const testData: GoalInput = {
      name: "Test goal",
      type: TYPES.DAILY,
      lastCompleted: yesterday,
      deletionCallback: () => { },
      finishedCallback: () => { }
    }

    render(<Goal {...testData} />);
    expect(screen.getByText(/Test goal/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Done/ })).toBeInTheDocument();
  })

  it("goals not yet completed renders with a done button", () => {
    const msPerHalfDay = 12 * 60 * 60 * 1000;
    const future: Date = new Date(new Date().getTime() + msPerHalfDay);
    const testData: GoalInput = {
      name: "Test goal",
      type: TYPES.DAILY,
      lastCompleted: future,
      deletionCallback: () => { },
      finishedCallback: () => { }
    }

    render(<Goal {...testData} />);
    expect(screen.getByText(/Test goal/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Undo/ })).toBeInTheDocument();
  })
})