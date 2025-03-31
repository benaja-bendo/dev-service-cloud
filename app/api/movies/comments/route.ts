import { NextResponse } from 'next/server';
import { Db, MongoClient } from 'mongodb';
import clientPromise from '@/lib/mongodb';

/**
 * @swagger
 * /api/movies/comments:
 *   get:
 *     summary: Récupère tous les commentaires
 *     description: Retourne la liste de tous les commentaires liés aux films.
 *     responses:
 *       200:
 *         description: Liste des commentaires récupérée avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
export async function GET(): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    const comments = await db.collection('comments').find({}).toArray();
    return NextResponse.json({ status: 200, data: comments });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: 'Internal Server Error', error: error.message });
  }
}