import { Db, MongoClient } from 'mongodb';
import bcrypt from 'bcrypt';
import clientPromise from '@/lib/mongodb';

interface UserData {
  email: string;
  password: string;
}

/**
 * Vérifie l'existence et la validité d'un utilisateur dans la base `sample_mflix`.
 * @param email L'email de l'utilisateur
 * @param password Le mot de passe en clair (fourni lors du login)
 * @returns L'utilisateur (sans son mot de passe) si validé, sinon `null`
 */
export async function verifyUser(email: string, password: string) {
  // Récupération du client MongoDB (pool de connexion)
  const client: MongoClient = await clientPromise;
  const db: Db = client.db('sample_mflix');

  // Recherche de l'utilisateur par email
  const user = await db.collection('users').findOne({ email });
  if (!user) {
    // L'utilisateur n'existe pas
    return null;
  }

  // Comparaison du mot de passe fourni avec le mot de passe haché stocké
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    // Mot de passe incorrect
    return null;
  }

  // Exclure le champ password de l'objet retourné
  const { password: _pwd, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Crée un nouvel utilisateur dans la base `sample_mflix`.
 * @param email L'email de l'utilisateur
 * @param password Le mot de passe en clair (sera haché avant stockage)
 * @returns L'utilisateur créé (sans le mot de passe)
 */
export async function createUser({ email, password }: UserData) {
  // Récupération du client MongoDB (pool de connexion)
  const client: MongoClient = await clientPromise;
  const db: Db = client.db('sample_mflix');

  // Vérifier si un utilisateur existe déjà avec cet email
  const existingUser = await db.collection('users').findOne({ email });
  if (existingUser) {
    throw new Error('Un utilisateur avec cet email existe déjà.');
  }

  // Hachage du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Création de l'objet utilisateur
  const newUser = {
    email,
    password: hashedPassword,
    createdAt: new Date(),
    // Ajouter d'autres champs si besoin (ex. name, roles, etc.)
  };

  // Insertion du nouvel utilisateur
  const result = await db.collection('users').insertOne(newUser);

  // Retourner l'utilisateur créé (on peut y inclure l'ID, la date de création, etc.)
  return {
    _id: result.insertedId,
    email: newUser.email,
    createdAt: newUser.createdAt,
  };
}
