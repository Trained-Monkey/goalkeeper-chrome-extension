// Element containing the name of the goal, when it expires as well as its 
// duration
// - 

import {screen, render, fireEvent} from "@testing-library/react";
import Goal from "../../components/Goal";
import GoalInput from "../../interface/GoalInput";
import { TYPES } from "../../constants/Goal";
import React from "react";

describe("Goal", () => {
    it("shows a name, expiry and duration", () => {
        const currentDate = new Date();
        const testData: GoalInput = {
            name: "Drink water",
            last_completed: currentDate,
            type: TYPES.DAILY,
            callback: () => {}
        }

        render(<Goal {...testData} />);

        expect(screen.getByText("Drink water")).toBeInTheDocument();
        expect(screen.getByText("Daily")).toBeInTheDocument();
        expect(screen.getByText("In 24 hours")).toBeInTheDocument();
    })

    it("can show weekly expiry", () =>{
        const currentDate = new Date();
        const testData: GoalInput = {
            name: "Drink water",
            last_completed: currentDate,
            type: TYPES.WEEKLY,
            callback: () => {}
        }

        render(<Goal {...testData} />);

        expect(screen.getByText("Drink water")).toBeInTheDocument();
        expect(screen.getByText("Weekly")).toBeInTheDocument();
        expect(screen.getByText("In 6 days")).toBeInTheDocument();
    })

    it("can show forntnightly expiry", () =>{
        const currentDate = new Date();
        const testData: GoalInput = {
            name: "Drink water",
            last_completed: currentDate,
            type: TYPES.FORTNIGHTLY,
            callback: () => {}
        }

        render(<Goal {...testData} />);

        expect(screen.getByText("Drink water")).toBeInTheDocument();
        expect(screen.getByText("Fortnightly")).toBeInTheDocument();
        expect(screen.getByText("In 1 week")).toBeInTheDocument();
    })

    it("can show monthly expiry", () =>{
        const currentDate = new Date();
        const testData: GoalInput = {
            name: "Drink water",
            last_completed: currentDate,
            type: TYPES.MONTHLY,
            callback: () => {}
        }

        render(<Goal {...testData} />);

        expect(screen.getByText("Drink water")).toBeInTheDocument();
        expect(screen.getByText("Monthly")).toBeInTheDocument();
        expect(screen.getByText("In 1 month")).toBeInTheDocument();
    })

    it("has a clickable button", () => {
        const currentDate = new Date();
        const testData: GoalInput = {
            name: "Drink water",
            last_completed: currentDate,
            type: TYPES.DAILY,
            callback: jest.fn(() => {})
        }
        
        render(<Goal {...testData}/>)
        const button = screen.getByRole('button');

        fireEvent.click(button);

        expect(testData.callback.mocks.calls).toHaveLength(1)
    })
})