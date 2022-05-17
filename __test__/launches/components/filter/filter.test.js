/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, act } from '@testing-library/react';
import { LaunchFilter } from '@launches/components'

describe('Filter Component', () => {

  it('should render properly', async () => {
    render(<LaunchFilter />);

    const startInput = await screen.findByLabelText('start');
    const endInput = await screen.findByLabelText('end');

    await act(() => {
      fireEvent.change(startInput, { target: { value: '2012-12-12' } });
      fireEvent.change(endInput, { target: { value: '2012-12-13' } });
    })

    expect(startInput.value).toBe('2012-12-12');
    expect(endInput.value).toBe('2012-12-13');
  });

  it('should show that end field is required', async () => {
    render(<LaunchFilter />);

    const startInput = await screen.findByLabelText('start');

    await act(() => {
      fireEvent.change(startInput, { target: { value: '2012-12-12' } });
    });

    expect(await screen.findByText(/Required/i)).toHaveTextContent('Required');
  });

});
