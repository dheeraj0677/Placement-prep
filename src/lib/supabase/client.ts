import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

export function createClient() {
  if (client) return client;

  client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key',
    {
      isSingleton: true,
      cookieOptions: {
        maxAge: 400 * 24 * 60 * 60, // 400 days persistent cookie
        sameSite: 'lax',
        path: '/',
      },
    }
  );

  return client;
}

