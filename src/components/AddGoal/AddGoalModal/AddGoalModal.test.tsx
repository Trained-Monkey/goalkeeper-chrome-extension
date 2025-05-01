import { fireEvent, render, screen } from "@testing-library/react"
import AddGoalModal from "./AddGoalModal"
import React from "react";
import Goal from "../../../interface/Goal";
import { TYPES } from "../../../constants/Goal";

describe("AddGoalModal", () => {
    it("renders", () => {
        const closeModal = jest.fn(() => { });
        const addGoalCallback = jest.fn(() => { });
        const closeModalOnClick = jest.fn(() => { });

        render(<AddGoalModal closeModal={closeModal} closeModalOnClick={closeModalOnClick} addGoalCallback={addGoalCallback} />);

        const element: HTMLElement = screen.getByText(/Add a goal/);
        expect(element).toBeInTheDocument();
    })

    it("can submit goals", () => {
        const closeModal = jest.fn(() => { });
        const addGoalCallback = jest.fn(() => { });
        const closeModalOnClick = jest.fn(() => { });

        render(<AddGoalModal closeModal={closeModal} closeModalOnClick={closeModalOnClick} addGoalCallback={addGoalCallback} />);

        const textbox: HTMLElement = screen.getByRole('textbox', { name: /Goal name/ });
        const dropdown: HTMLElement = screen.getByRole('combobox', { name: /Goal to be completed/ });
        const date: HTMLElement = screen.getByRole('textbox', {name: /Start on/});

        fireEvent.change(textbox, { target: { value: 'Test goal' } });
        fireEvent.change(dropdown, { target: { value: TYPES.DAILY } });
        fireEvent.change(date, {target: {value: "02/05/2025"}})
        const button: HTMLElement = screen.getByRole('button', { name: /Add goal/ });
        fireEvent.click(button);

        const expectedGoal: Goal = {
            name: "Test goal",
            type: TYPES.DAILY,
            lastCompleted: new Date(new Date().setHours(0, 0, 0, 0))
        }

        expect(addGoalCallback).toHaveBeenCalledWith(expectedGoal);
        expect(closeModal).toHaveBeenCalledTimes(1);
    })

    it("can close modal from close button", () => {
        const closeModal = jest.fn(() => { });
        const addGoalCallback = jest.fn(() => { });
        const closeModalOnClick = jest.fn(() => { });


        render(<AddGoalModal closeModal={closeModal} closeModalOnClick={closeModalOnClick} addGoalCallback={addGoalCallback} />);
        expect(closeModal).toHaveBeenCalledTimes(0);

        const button: HTMLElement = screen.getByRole('button', { name: /Close/ });
        fireEvent.click(button);
        expect(closeModal).toHaveBeenCalledTimes(1);
    })

    it("can close modal from clicking off screen", () => {
        const closeModal = jest.fn(() => { });
        const addGoalCallback = jest.fn(() => { });
        const closeModalOnClick = jest.fn(() => { });

        render(<AddGoalModal closeModal={closeModal} closeModalOnClick={closeModalOnClick} addGoalCallback={addGoalCallback} />);

        const button: HTMLElement = screen.getByRole('dialog');
        fireEvent.click(button);
        expect(closeModalOnClick).toHaveBeenCalledTimes(1);
    })
})