import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  async function login() {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin + '/dashboard' }
    });
    if (!error) setSent(true);
    else alert(error.message);
  }

  return (
    <div className="container">
      <h1>LinkLocator</h1>
      <p className="muted">Track where your links are opened. Personal use.</p>
      {sent ? (
        <div className="card">
          Check <b>{email}</b> for a magic login link.
        </div>
      ) : (
        <>
          <input
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <button onClick={login}>Send magic link</button>
        </>
      )}
    </div>
  );
}
