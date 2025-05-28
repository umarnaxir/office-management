import { useState } from 'react';
import Section from './Section';

const API = 'http:/192.168.1.19:3000';

export default function QueryBot() {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuery = async () => {
    if (!prompt.trim()) return alert('Enter a question');

    setLoading(true);
    try {
    const res = await fetch(`http://192.168.1.19:3000/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: prompt.trim(),
        index_prefix: 'realtime_index.faiss',
      })
    });
        const data = await res.json();

    setOutput(data.answer || JSON.stringify(data));
    }
    catch(e) {
        alert(e)
    }
    finally {
        setLoading(false);
    }

  };

  return (
    <Section title="2. Ask a Question">
      <input
        className="input"
        placeholder="How does authentication work?"
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value)
        }}
      />
      <button className="button" onClick={handleQuery} disabled={loading}>
        {loading ? 'Loading...' : 'Ask Question'}
      </button>
      <pre className="output">{output}</pre>
    </Section>
  );
}