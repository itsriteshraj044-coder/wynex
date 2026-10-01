/**
 * Posts a form to public/api/contact.php, which emails it to the site mailbox.
 * Throws an Error whose message is safe to show the visitor.
 */

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  service: string;
  message: string;
}

type Payload = ({ type: 'contact' } & ContactPayload) | { type: 'newsletter'; email: string };

export async function sendForm(
  payload: Payload,
  /** Date.now() when the form was shown; lets the server spot instant bot submissions. */
  startedAt: number,
  /** Value of the hidden honeypot field; real visitors leave it empty. */
  honeypot = '',
): Promise<void> {
  let res: Response;
  try {
    res = await fetch('/api/contact.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, website: honeypot, elapsedMs: Date.now() - startedAt }),
    });
  } catch {
    throw new Error('Network error — please check your connection and try again.');
  }
  const body = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (!res.ok || !body?.ok) {
    throw new Error(body?.error ?? 'Something went wrong. Please try again.');
  }
}
