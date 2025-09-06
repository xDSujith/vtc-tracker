
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EventsManagement } from './events-management';

describe('EventsManagement', () => {
  it('renders the component with event data', () => {
    render(<EventsManagement />);
    
    expect(screen.getByText('Weekly Convoy - Berlin to Prague')).toBeInTheDocument();
    expect(screen.getByText('VTC Training Session')).toBeInTheDocument();
    expect(screen.getByText('Special Event - Christmas Convoy')).toBeInTheDocument();
  });
});
