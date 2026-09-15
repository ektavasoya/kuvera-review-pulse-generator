async function callGroqWithRetry(groqMessages, retries = 5) {
  const waitTimes = [2000, 3000, 4000, 6000, 8000]; // total worst-case ~23s, well under the 60s budget

  for (let attempt = 0; attempt <= retries; attempt++) {
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-120b',
        max_tokens: 4000,
        reasoning_effort: 'low',
        temperature: 0.3,
        messages: groqMessages
      })
    });

    if (groqResponse.status !== 429) {
      return groqResponse;
    }

    if (attempt < retries) {
      const retryAfter = groqResponse.headers.get('retry-after');
      const waitMs = retryAfter ? parseFloat(retryAfter) * 1000 : waitTimes[attempt];
      await new Promise(resolve => setTimeout(resolve, waitMs));
    } else {
      return groqResponse;
    }
  }
}

export const config = {
  maxDuration: 60,
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({
      error: 'Server misconfigured: GROQ_API_KEY environment variable is not set.'
    });
  }

  try {
    const { system, messages } = req.body;

    if (!system || !messages) {
      return res.status(400).json({ error: 'Missing system or messages in request body.' });
    }

    const groqMessages = [
      { role: 'system', content: system },
      ...messages.map(m => ({ role: m.role, content: m.content }))
    ];

    const groqResponse = await callGroqWithRetry(groqMessages);
    const data = await groqResponse.json();

    if (!groqResponse.ok) {
      if (groqResponse.status === 429) {
        return res.status(200).json({
          content: [{
            type: 'text',
            text: '{"error": "Getting a lot of requests right now - please wait about 30 seconds and try again."}'
          }]
        });
      }
      return res.status(groqResponse.status).json({
        error: 'Groq API error',
        details: data
      });
    }

    const answerText = data.choices?.[0]?.message?.content || '';

    if (data.choices?.[0]?.finish_reason === 'length') {
      return res.status(200).json({
        content: [{
          type: 'text',
          text: '{"error": "The response was cut off before it finished. Please try again with a smaller batch of reviews."}'
        }]
      });
    }

    return res.status(200).json({
      content: [{ type: 'text', text: answerText }]
    });
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}
