import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { Db, MongoClient } from 'mongodb';
import clientPromise from '@/lib/mongodb';

/**
 * @swagger
 * /api/theaters/{idTheater}:
 *   get:
 *     summary: Récupère un théâtre par son ID
 *     parameters:
 *       - in: path
 *         name: idTheater
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du théâtre
 *     responses:
 *       200:
 *         description: Théâtre récupéré avec succès
 *       404:
 *         description: Théâtre non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export async function GET(request: Request, { params }: { params: { idTheater: string } }): Promise<NextResponse> {
  const { idTheater } = params;
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    const theater = await db.collection('theaters').findOne({ _id: new ObjectId(idTheater) });
    if (!theater) {
      return NextResponse.json({ status: 404, message: "Théâtre non trouvé" });
    }
    return NextResponse.json({ status: 200, data: theater });
  } catch (error: any) {
    return NextResponse.json({ status: 500, message: "Internal Server Error", error: error.message });
  }
}