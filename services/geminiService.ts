export const getTacticalAdvice = async (userMessage: string): Promise<string> => {
  try {
    const res = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Gemini proxy error:', res.status, text);
      return 'Signal lost. Unable to process request. Check comms link.';
    }

    const data = await res.json();
    return data.text || 'Comms interference. Please repeat transmission.';
  } catch (error) {
    console.error('Fetch error:', error);
    return 'Signal lost. Unable to process request. Check comms link.';
  }
};