import { screen, render, waitFor } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import React from "react";
// Components
import AddGoal from "./AddGoal";

describe("AddGoal", () => {
  it("exists as a clickable button", () => {
    const callback = jest.fn(() => { });
    render(<AddGoal addGoalCallback={callback} />);

    const button: HTMLElement = screen.getByRole('button', {
      name: /Add Goal/
    });

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  })
  it("creates a modal", async () => {
    const callback = jest.fn(() => { });
    render(<AddGoal addGoalCallback={callback} />);

    const button: HTMLElement = screen.getByRole('button', {
      name: /Add Goal/
    });

    let modal: HTMLElement | null;
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(button);

    await waitFor(async () => {
      modal = screen.queryByRole('dialog');
      expect(modal).toBeInTheDocument();
    }, { timeout: 2000 })
  })
  it("can close the modal by clicking the close button", async () => {
    const callback = jest.fn(() => { });
    render(<AddGoal addGoalCallback={callback} />);

    const addGoalButton: HTMLElement = screen.getByRole('button', {
      name: /Add Goal/
    });

    let modal: HTMLElement | null;
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(addGoalButton);

    await waitFor(async () => {
      modal = screen.queryByRole('dialog');
      expect(modal).toBeInTheDocument();
    }, { timeout: 2000 })

    const closeModalButton = screen.getByRole('button', { name: /Close/ });
    fireEvent.click(closeModalButton);

    await waitFor(async () => {
      modal = screen.queryByRole('dialog');
      expect(modal).not.toBeInTheDocument();
    }, { timeout: 2000 })
  })
  it("can close the modal clicking off the modal", async () => {
    const callback = jest.fn(() => { });
    render(<AddGoal addGoalCallback={callback} />);

    const button: HTMLElement = screen.getByRole('button', {
      name: /Add Goal/
    });

    let modal: HTMLElement | null;
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    fireEvent.click(button);

    await waitFor(async () => {
      modal = screen.queryByRole('dialog');
      expect(modal).toBeInTheDocument();
    }, { timeout: 2000 })

    fireEvent.click(modal!);

    await waitFor(async () => {
      modal = screen.queryByRole('dialog');
      expect(modal).not.toBeInTheDocument();
    }, { timeout: 2000 })
  })
})