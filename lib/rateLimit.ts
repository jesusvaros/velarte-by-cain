const ipCache = new Map<string, { count: number; lastReset: number }>();

export function rateLimit(ip: string, limit = 5, windowMs = 60000) {
  const now = Date.now();
  const record = ipCache.get(ip);

  if (!record || now - record.lastReset > windowMs) {
    ipCache.set(ip, { count: 1, lastReset: now });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count += 1;
  return true;
}
