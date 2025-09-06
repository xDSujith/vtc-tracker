
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { EventsManagement } from './events-management';

describe('EventsManagement', () => {
  it('renders the component with event data', async () => {
    render(<EventsManagement />);
    
    await userEvent.click(screen.getByText('All Events'));

    expect(screen.getByText('Weekly Convoy - Berlin to Prague')).toBeInTheDocument();
    expect(screen.getByText('VTC Training Session')).toBeInTheDocument();
    expect(screen.getByText('Special Event - Christmas Convoy')).toBeInTheDocument();
  });
});
