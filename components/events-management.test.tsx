
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EventsManagement } from '../components/events-management';

describe('EventsManagement', () => {
  it('renders the component with event data', () => {
    render(<EventsManagement />);
    
    expect(screen.getByText('Euro Truck Simulator 2 Convoy')).toBeInTheDocument();
    expect(screen.getByText('American Truck Simulator Convoy')).toBeInTheDocument();
    expect(screen.getByText('ProMods Convoy')).toBeInTheDocument();
  });
});
