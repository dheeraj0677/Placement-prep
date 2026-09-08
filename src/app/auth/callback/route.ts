import { NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // If "next" is in the param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/checklist';

  if (code) {
    const cookieStore = cookies();

    const forwardedHost = request.headers.get('x-forwarded-host');
    const isLocalEnv = process.env.NODE_ENV === 'development';
    let targetOrigin = origin;
    if (!isLocalEnv && forwardedHost) {
      targetOrigin = `https://${forwardedHost}`;
    }
    const redirectUrl = `${targetOrigin}${next}`;

    // Create the redirect response upfront so cookies are explicitly attached to it
    const response = NextResponse.redirect(redirectUrl);

    const isProduction = process.env.NODE_ENV === 'production';

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
            cookiesToSet.forEach(({ name, value, options }) => {
              const finalOptions: CookieOptions = {
                ...options,
                maxAge: options?.maxAge ?? 400 * 24 * 60 * 60, // Ensure ~400 days persistence
                sameSite: 'lax',
                path: '/',
                ...(isProduction ? { secure: true } : {}),
              };

              try {
                cookieStore.set(name, value, finalOptions);
              } catch {
                // Ignore if cookieStore is read-only in this context
              }

              // Explicitly attach to the outgoing HTTP redirect response
              response.cookies.set(name, value, finalOptions);
            });
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return response;
    }

    console.error('Error exchanging code for session:', error);
  }

  // Return the user to an error page or home with some instructions
  return NextResponse.redirect(`${origin}/login?error=Could%20not%20authenticate`);
}

