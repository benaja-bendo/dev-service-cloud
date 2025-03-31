import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  // Définir les chemins publics
  const publicPaths = [
    '/api/auth/login',
    '/api/auth/signup',
    '/api/auth/refresh'
  ];

  // Si la route est publique, on passe directement
  if (publicPaths.includes(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Récupération du token dans l'en-tête Authorization (format: Bearer token)
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: 'Token invalide ou expiré' }, { status: 401 });
  }
}

export const config = {
  matcher: ['/api/:path*']
};
