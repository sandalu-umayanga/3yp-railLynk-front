import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Set up the mock server with the handlers
export const server = setupServer(...handlers);

// Start the server before the tests
beforeAll(() => server.listen());

// Reset the handlers after each test to prevent test interference
afterEach(() => server.resetHandlers());

// Close the server after all tests are done
afterAll(() => server.close());
