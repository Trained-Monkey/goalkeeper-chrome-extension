// Tests for the functionality of the list of goals, handles the overall display
// and logic of setting goals to be down
// - List of goals should be rendered
// - Should be sorted by expiry, soon to expire -> top, done -> bottom
// - Goals should be removed from list when removal callback is ran

import { render, screen } from '@testing-library/react'
import GoalList from '../../components/GoalList'
// import describe from 'node:test'

describe('GoalList', () => {
    it('should contain the title', () => {
        render(<GoalList />);

        const elements: HTMLElement[] = screen.queryAllByText('Goal List');

        expect(elements.length).toBe(1);
        expect(elements[0].textContent).toBe('Goal List');
    })

    it('should render goals', () => {
        const goals = [{ "name" : "Drink water" }]


    })

    it('should be sorted', () => {

    })

    it('should be able to remove', () => {

    })
})

// describe('Dropdown', () => {
//     test('renders correctly', () => {
//         render(<Dropdown />)
        
//         const elements = screen.getAllByRole('img')
//         elements.map((element) => {
//             expect(element).toHaveAttribute('src')
//         })
//     });

//     test('has correct number of elements', () => {
//         render(<Dropdown />)
        
//         const elements = screen.getAllByRole('img')
//         expect(elements.length).toBe(ITEM_SELECTABLE.length)
//     });

//     test('can be clicked on', async () => {
//         const mockHandleClick = jest.fn();
//         render(<Dropdown

//             handleOnClick={mockHandleClick}
//         />)

//         const element = screen.getAllByRole('img')[0];

//         await userEvent.click(element);
//         expect(mockHandleClick).toHaveBeenCalled();
//     })
// })
