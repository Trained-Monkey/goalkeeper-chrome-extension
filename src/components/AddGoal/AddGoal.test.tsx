import {screen, render} from "@testing-library/react";
import AddGoal from "./AddGoal";
import { fireEvent } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";

describe("AddGoal", () => {
    it("exists as a clickable button", () => {
        render(<AddGoal/>);

        const button: HTMLElement = screen.getByRole('button', {
            name: /Add Goal/
        });
        
        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();
    })

    it("creates a modal", () => {
        render(<AddGoal/>);

        const button: HTMLElement = screen.getByRole('button', {
            name: /Add Goal/
        });
        
        let modal: HTMLElement = screen.getByRole('dialog');
        expect(modal).not.toBeInTheDocument();
        fireEvent.click(button);

        modal = screen.getByRole('dialog');
        expect(modal).toBeInTheDocument();
    })
})