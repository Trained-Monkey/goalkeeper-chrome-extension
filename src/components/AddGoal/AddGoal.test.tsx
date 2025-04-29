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

        let modal: HTMLElement;
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        fireEvent.click(button);

        await waitFor(async () => {
            expect(callback.mock.calls).toHaveBeenCalledTimes(1);

            modal = await screen.findByRole('dialog');
            expect(modal).toBeInTheDocument();
        })

    })
})