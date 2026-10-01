/**
 * Thin wrappers around the gtag() stub defined in index.html (Google Analytics 4
 * with Consent Mode). Safe to call anywhere: if the tag is missing they no-op.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type ConsentChoice = 'granted' | 'denied';

const CONSENT_KEY = 'wynex-consent';
/** Fired to reopen the cookie banner (e.g. from the footer's "Cookie settings"). */
export const OPEN_CONSENT_EVENT = 'wynex:open-consent';

export function getConsent(): ConsentChoice | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    /* private mode etc. — the choice just won't persist */
  }
  window.gtag?.('consent', 'update', { analytics_storage: choice });
}

export function openConsentSettings() {
  window.dispatchEvent(new Event(OPEN_CONSENT_EVENT));
}

export function track(event: string, params: Record<string, string | number> = {}) {
  window.gtag?.('event', event, { page_path: window.location.pathname, ...params });
}
