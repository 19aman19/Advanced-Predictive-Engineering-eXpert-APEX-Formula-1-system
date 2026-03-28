export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    // Strip any extra fields — Anthropic only allows role + content
    const messages = (body.messages || [])
      .map(m => ({ role: m.role, content: String(m.content || '') }))
      .filter(m => m.content && (m.role === 'user' || m.role === 'assistant'));

    const payload = {
      model: body.model || 'claude-sonnet-4-20250514',
      max_tokens: body.max_tokens || 400,
      messages,
    };
    if (body.system) payload.system = body.system;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json(data);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
