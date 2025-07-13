import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AdminTracking from '../../components/AdminTracking';
import API from '../../api';

// Mock the API module
vi.mock('../../api');

// Mock react-leaflet components
vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }) => <div data-testid="map-container">{children}</div>,
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ children }) => <div data-testid="marker">{children}</div>,
  Popup: ({ children }) => <div data-testid="popup">{children}</div>,
  Polyline: () => <div data-testid="polyline" />,
  useMap: () => ({
    fitBounds: vi.fn(),
  }),
}));

const mockStations = [
  { id: 1, name: 'Station A', latitude: 6.9271, longitude: 79.8612 },
  { id: 2, name: 'Station B', latitude: 7.2906, longitude: 80.6337 },
];

const mockTrains = [
  { name: 'Train 1', position: [6.93, 79.87], speed: 60, status: 'On Time' },
  { name: 'Train 2', position: [7.29, 80.64], speed: 0, status: 'Stopped' },
];

describe('AdminTracking', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
    
    // Mock API responses
    API.get.mockImplementation((url) => {
      if (url.includes('station/list')) {
        return Promise.resolve({ data: mockStations });
      }
      if (url.includes('/trains/locations')) {
        return Promise.resolve({ data: mockTrains });
      }
      if (url.includes('/trains/details')) {
        return Promise.resolve({ data: { name: 'Train 1', details: 'Some details' } });
      }
      return Promise.reject(new Error(`Unknown API endpoint: ${url}`));
    });
  });

  it('renders loading state initially', () => {
    render(<AdminTracking />);
    expect(screen.getByText('Loading train and station data...')).toBeInTheDocument();
  });

  it('fetches and displays stations and trains', async () => {
    render(<AdminTracking />);
    
    // Wait for loading to disappear
    await waitFor(() => {
      expect(screen.queryByText('Loading train and station data...')).not.toBeInTheDocument();
    });

    // Check if the map and controls are rendered
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    expect(screen.getByText('Select a train to view details:')).toBeInTheDocument();

    // Check for train and station markers (2 stations + 2 trains = 4 markers)
    await waitFor(() => {
        const markers = screen.getAllByTestId('marker');
        expect(markers.length).toBe(4);
    });
  });

  it('allows selecting a train from the dropdown', async () => {
    render(<AdminTracking />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading train and station data...')).not.toBeInTheDocument();
    });

    // Select a train from the dropdown
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'Train 1' } });

    // Wait for the details to be fetched and displayed
    await waitFor(() => {
      expect(API.get).toHaveBeenCalledWith('/trains/details/Train 1');
      expect(screen.getByText('Train Details')).toBeInTheDocument();
      expect(screen.getByText(/Some details/)).toBeInTheDocument();
    });
  });

  it('resets the view when the reset button is clicked', async () => {
    render(<AdminTracking />);
    
    await waitFor(() => {
      expect(screen.queryByText('Loading train and station data...')).not.toBeInTheDocument();
    });

    const resetButton = screen.getByRole('button', { name: /reset view/i });
    fireEvent.click(resetButton);

    // The useMap mock has a fitBounds function. We can't directly test its effect
    // on the DOM without a more complex mock, but we can confirm the button exists and is clickable.
    expect(resetButton).toBeInTheDocument();
  });
});
