import { rest } from 'msw';

export const handlers = [
  // Example: Mocking the registration POST request
  rest.post('/api/register', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: 'Registration successful' }) // Adjust the response body as needed
    );
  }),
];
