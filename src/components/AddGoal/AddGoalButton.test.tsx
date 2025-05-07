// Testing add goal button exists
import { screen, render, waitFor } from "@testing-library/react";
import React from "react";
// Components
import AddGoalButton from "./AddGoalButton";

describe("AddGoalButton", () => {
  it("exists as a clickable button", () => {
    const callback = jest.fn(() => { });
    render(<AddGoalButton addGoalCallback={callback} />);

    const button: HTMLElement = screen.getByRole('button', {
      name: /Add Goal/
    });

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  })
})