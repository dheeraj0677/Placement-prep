import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder-project')) {
    return response;
  }

  const isProduction = process.env.NODE_ENV === 'production';

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            const finalOptions: CookieOptions = {
              ...options,
              maxAge: options?.maxAge ?? 400 * 24 * 60 * 60,
              sameSite: 'lax',
              path: '/',
              ...(isProduction ? { secure: true } : {}),
            };
            response.cookies.set(name, value, finalOptions);
          });
        },
      },
    }
  );

  try {
    // Refresh the user session if needed
    await supabase.auth.getUser();
  } catch (e) {
    // Fail gracefully without blocking request pipeline
  }

  return response;
}

