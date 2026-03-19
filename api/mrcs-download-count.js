const COUNTER_BASE_URL =
  'https://api.counterapi.dev/v1/scorpionxweb/mrcs-download-count';

export default async function handler(req, res) {
  try {
    const action = req.query?.action;
    const endpoint = action === 'hit' ? `${COUNTER_BASE_URL}/up` : COUNTER_BASE_URL;

    const response = await fetch(endpoint, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({
        ok: false,
        message: 'Counter upstream request failed',
      });
    }

    const payload = await response.json();
    const count = Number(payload?.count);

    if (!Number.isFinite(count)) {
      return res.status(502).json({
        ok: false,
        message: 'Invalid counter response payload',
      });
    }

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({ ok: true, count });
  } catch {
    return res.status(500).json({
      ok: false,
      message: 'Counter service temporarily unavailable',
    });
  }
}
