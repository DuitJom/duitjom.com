import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';

export default createEndpoint({
  description: 'Finds the public company record for a Merchant ID; does not authenticate the user',
  inputSchema: z.object({ merchantId: z.string() }),
  outputSchema: z.object({ valid: z.boolean() }),
  execute: async ({ input }) => ({
    valid: input.merchantId.trim() === '2000162100241',
  }),
});
