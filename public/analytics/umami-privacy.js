// Keep only pageviews; avoid carrying query parameters or fragments to analytics.
window.urbancareUmamiBeforeSend = (type, payload) => {
  if (type !== 'event' || !payload || payload.name || payload.id) return false;
  const clean = { ...payload };
  for (const key of ['url', 'referrer']) {
    if (!clean[key]) continue;
    try {
      const url = new URL(clean[key], window.location.origin);
      if (!['http:', 'https:'].includes(url.protocol)) return false;
      clean[key] = key === 'url' ? url.pathname : url.origin + url.pathname;
    } catch { return false; }
  }
  delete clean.data;
  return clean;
};
