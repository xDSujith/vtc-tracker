
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { EventsManagement } from './events-management';

describe('EventsManagement', () => {
  it('renders the component with event data', async () => {
    render(<EventsManagement />);
    
    const allEventsTab = screen.getByText('All Events');
    await userEvent.click(allEventsTab);

    await waitFor(() => {
        expect(screen.getByText('Weekly Convoy - Berlin to Prague')).toBeInTheDocument();
        expect(screen.getByText('VTC Training Session')).toBeInTheDocument();
        expect(screen.getByText('Special Event - Christmas Convoy')).toBeInTheDocument();
    });
  });
});
