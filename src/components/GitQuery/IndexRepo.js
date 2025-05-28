import { useState } from 'react';
import Section from './Section';

const API = 'http://192.168.1.19:3000';

export default function IndexRepo() {
  const [repoUrl, setRepoUrl] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleIndex = async () => {
    if (!repoUrl.trim()) return alert('Enter a repo URL');
    
    setLoading(true);
    try {
      const res = await fetch(`${API}/index`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          repo_url: repoUrl.trim(),
          exts: ['.py'],
          out_prefix: 'myindex',
          cache_dir: '.repo_cache'
        })
      });
      const text = await res.text();
      setOutput(text);
    }
    catch(e) {
      alert(e);
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <Section title="1. Index a GitHub Repo">
      <input
        className="input"
        placeholder="https://github.com/you/your-repo.git"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />
      <button className="button" onClick={handleIndex} disabled={loading}>
        {loading ? 'Indexing...' : 'Index Repo'}
      </button>
      <pre className="output">{output}</pre>
    </Section>
  );
}