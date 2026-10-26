import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';

export default createEndpoint({
  description: 'Checks whether the replacement dashboard is available',
  inputSchema: z.object({}),
  outputSchema: z.object({ available: z.boolean() }),
  execute: async () => ({ available: false }),
});
