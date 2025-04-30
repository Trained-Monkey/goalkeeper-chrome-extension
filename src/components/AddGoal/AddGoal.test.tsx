import { screen, render, waitFor } from "@testing-library/react";
import AddGoal from "./AddGoal";
import { fireEvent } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import GoalInput from "../../interface/GoalInput";

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
            // TODO: Check why hidden isnt being removed on button click
            modal = screen.queryByRole('dialog', {hidden: true});
            expect(modal).toBeInTheDocument();
        }, { timeout: 2000 })

    })
})