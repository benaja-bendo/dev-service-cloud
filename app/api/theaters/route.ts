import { NextResponse } from 'next/server';
import { Db, MongoClient } from 'mongodb';
import clientPromise from '@/lib/mongodb';

/**
 * @swagger
 * /api/theaters:
 *   get:
 *     summary: Récupère tous les théâtres et cinémas
 *     description: Retourne la liste de tous les théâtres et cinémas.
 *     responses:
 *       200:
 *         description: Liste récupérée avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
export async function GET(): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    const theaters = await db.collection('theaters').find({}).toArray();
    return NextResponse.json({ status: 200, data: theaters });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: "Internal Server Error", error: error.message });
  }
}