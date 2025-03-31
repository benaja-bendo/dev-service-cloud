import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { createUser } from '@/lib/auth'; // Fonction à implémenter pour créer un utilisateur

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const user = await createUser({ email, password: hashedPassword });
    if (!user) {
      return NextResponse.json({ error: 'Erreur lors de la création de l’utilisateur' }, { status: 400 });
    }

    return NextResponse.json({ message: 'Utilisateur créé avec succès', user });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
