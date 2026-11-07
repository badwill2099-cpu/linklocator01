import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabase';

function randSlug() {
  return Math.random().toString(36).slice(2, 8);
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [links, setLinks] = useState([]);
  const [nickname, setNickname] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/');
      else { setUser(data.user); loadLinks(data.user.id); }
    });
  }, []);

  async function loadLinks(uid) {
    const { data } = await supabase
      .from('links').select('*')
      .eq('user_id', uid)
      .order('created_at', { ascending: false });
    setLinks(data || []);
  }

  async function createLink() {
    if (!url) return;
    const slug = randSlug();
    const { error } = await supabase.from('links').insert({
      user_id: user.id, slug, nickname: nickname ||
