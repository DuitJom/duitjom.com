import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';

export default createEndpoint({
  description: 'Checks the admin username and password to unlock admin menus',
  authenticated: true,
  inputSchema: z.object({ username: z.string(), password: z.string() }),
  outputSchema: z.object({ valid: z.boolean() }),
  execute: async ({ input }) => ({
    valid:
      input.username.trim() === process.env.ZITE_ADMIN_USERNAME &&
      input.password === process.env.ZITE_ADMIN_PASSWORD,
  }),
});
