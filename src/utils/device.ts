/** Android's compositor struggles with heavy JS-driven animation + blur; used to scale effects back. */
export const isAndroid = () => typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);
