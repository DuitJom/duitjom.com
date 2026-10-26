import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';

const MERCHANT_ID = '2000162100241';
const PASSKEY = '$sshUSer00';

export default createEndpoint({
  description: 'Checks a Merchant ID (and optionally its passkey) against the authorised merchant',
  inputSchema: z.object({ merchantId: z.string(), passkey: z.string().optional() }),
  outputSchema: z.object({ valid: z.boolean() }),
  execute: async ({ input }) => {
    const idOk = input.merchantId.trim() === MERCHANT_ID;
    if (input.passkey === undefined) return { valid: idOk };
    return { valid: idOk && input.passkey === PASSKEY };
  },
});
