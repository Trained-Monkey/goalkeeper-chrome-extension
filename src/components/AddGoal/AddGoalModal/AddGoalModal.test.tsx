import { fireEvent, render, screen } from "@testing-library/react"
import React from "react";
// Components
import AddGoalModal from "./AddGoalModal"
// Interfaces
import Goal from "../../../interface/Goal";
import { TYPES } from "../../../constants/Goal";

describe("AddGoalModal", () => {
  it("renders", () => {
    const closeModal = jest.fn(() => { });
    const addGoalCallback = jest.fn(() => { });
    const closeModalOnClick = jest.fn(() => { });

    render(<AddGoalModal
      closeModal={closeModal}
      closeModalIfClicked={closeModalOnClick}
      addGoalCallback={addGoalCallback}
    />);

    const element: HTMLElement = screen.getByText(/Add a goal/);
    expect(element).toBeInTheDocument();
  })
  it("can submit goals", () => {
    const closeModal = jest.fn(() => { });
    const addGoalCallback = jest.fn(() => { });
    const closeModalOnClick = jest.fn(() => { });

    render(<AddGoalModal
      closeModal={closeModal}
      closeModalIfClicked={closeModalOnClick}
      addGoalCallback={addGoalCallback}
    />);

    const textbox: HTMLElement = screen.getByRole('textbox', { name: /Goal name/ });
    const dropdown: HTMLElement = screen.getByRole('combobox', { name: /Goal to be completed/ });
    const date: HTMLElement = screen.getByRole('textbox', { name: /Start on/ });
    const year = 2024;
    const month = 11
    const day = 21

    fireEvent.change(textbox, { target: { value: 'Test goal' } });
    fireEvent.change(dropdown, { target: { value: TYPES.DAILY } });
    fireEvent.change(date, { target: { value: `${day}/${month}/${year}` } })
    const button: HTMLElement = screen.getByRole('button', { name: /Add goal/ });
    fireEvent.click(button);

    const expectedGoal: Goal = {
      name: "Test goal",
      type: TYPES.DAILY,
      lastCompleted: new Date(new Date(year, month - 1, day).setHours(0, 0, 0, 0))
    }

    expect(addGoalCallback).toHaveBeenCalledWith(expectedGoal);
    expect(closeModal).toHaveBeenCalledTimes(1);
  })

  it("can close modal from close button", () => {
    const closeModal = jest.fn(() => { });
    const addGoalCallback = jest.fn(() => { });
    const closeModalOnClick = jest.fn(() => { });

    render(<AddGoalModal
      closeModal={closeModal}
      closeModalIfClicked={closeModalOnClick}
      addGoalCallback={addGoalCallback}
    />);
    expect(closeModal).toHaveBeenCalledTimes(0);

    const button: HTMLElement = screen.getByRole('button', { name: /Close/ });
    fireEvent.click(button);
    expect(closeModal).toHaveBeenCalledTimes(1);
  })

  it("can close modal from clicking off screen", () => {
    const closeModal = jest.fn(() => { });
    const addGoalCallback = jest.fn(() => { });
    const closeModalOnClick = jest.fn(() => { });

    render(<AddGoalModal
      closeModal={closeModal}
      closeModalIfClicked={closeModalOnClick}
      addGoalCallback={addGoalCallback}
    />);

    const button: HTMLElement = screen.getByRole('dialog');
    fireEvent.click(button);
    expect(closeModalOnClick).toHaveBeenCalledTimes(1);
  })
})