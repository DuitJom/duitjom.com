import { z } from 'zod';
import { createEndpoint } from 'zitejs/backend';
import { integrations } from 'zitejs/integrations';

const TO = 'support@duitjom.my';

function b64url(s: string) {
  const bytes = new TextEncoder().encode(s);
  let bin = '';
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export default createEndpoint({
  description: 'Emails a new client registration to support@duitjom.my for manual entry',
  inputSchema: z.object({
    merchantId: z.string(),
    role: z.string(),
    phone: z.string(),
    pin: z.string(),
    email: z.string(),
  }),
  outputSchema: z.object({ success: z.boolean() }),
  execute: async ({ input }) => {
    const { accessToken } = await integrations.get('gmail');
    const time = new Date().toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' });
    const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
    const rows: [string, string][] = [
      ['Merchant ID', input.merchantId],
      ['Role', input.role],
      ['Phone', `+60${input.phone}`],
      ['PIN Access', input.pin],
      ['E-mail', input.email],
      ['Submitted', time],
    ];
    const html = `<!doctype html><html><body style="margin:0;background:#eef3f9;font-family:Segoe UI,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 12px;"><tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 24px rgba(10,25,60,.12);">
<tr><td style="background:linear-gradient(135deg,#0b3a75,#0b8fd6);background-color:#0b5fa8;padding:28px 32px;color:#fff;">
<div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;opacity:.8;">Merchant Portal</div>
<div style="font-size:22px;font-weight:700;margin-top:6px;">New Client Registration</div>
</td></tr>
<tr><td style="padding:24px 32px;">
<table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
${rows.map(([k, v]) => `<tr><td style="padding:12px 0;border-bottom:1px solid #e6edf5;color:#6b7a90;font-size:13px;width:40%;">${k}</td><td style="padding:12px 0;border-bottom:1px solid #e6edf5;color:#0f1d33;font-size:15px;font-weight:600;">${esc(v)}</td></tr>`).join('')}
</table>
<a href="mailto:${esc(input.email)}" style="display:inline-block;margin-top:24px;background:#0b8fd6;color:#fff;text-decoration:none;padding:12px 22px;border-radius:10px;font-weight:600;font-size:14px;">Reply to client</a>
</td></tr>
<tr><td style="padding:16px 32px;background:#f6f9fc;color:#8a97a8;font-size:12px;">Sent automatically from Merchant Portal. Please key in this record manually.</td></tr>
</table></td></tr></table></body></html>`;
    const subject = `New Registration - ${input.merchantId} - +60${input.phone}`;
    const raw = [
      `To: ${TO}`,
      `Reply-To: ${input.email}`,
      `Subject: =?UTF-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
      'MIME-Version: 1.0',
      'Content-Type: text/html; charset="UTF-8"',
      '',
      html,
    ].join('\r\n');
    const res = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ raw: b64url(raw) }),
    });
    if (!res.ok) {
      console.error('Gmail send failed', res.status, await res.text());
      throw new Error('Could not send your details. Please try again.');
    }
    return { success: true };
  },
});
