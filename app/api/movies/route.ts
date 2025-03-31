import { NextResponse } from 'next/server';
import { Db, MongoClient } from 'mongodb';
import clientPromise from '@/lib/mongodb';

/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Récupère une liste de films
 *     description: Retourne une liste de 10 films de la base de données 'sample_mflix'.
 *     responses:
 *       200:
 *         description: Liste des films récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 error:
 *                   type: string
 *                   example: "Description de l'erreur"
 */
export async function GET(): Promise<NextResponse> {
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db('sample_mflix');
    const movies = await db.collection('movies').find({}).limit(10).toArray();
    
    return NextResponse.json(
      { status: 200, data: movies }
    );
  }
  catch (error: any) {
    return NextResponse.json(
      { status: 500, message: 'Internal Server Error', error: error.message }
    );
  }
}

/**
 * @swagger
 * /api/movies:
 *   post:
 *     summary: Création non autorisée
 *     description: La méthode POST n'est pas autorisée sur cette route.
 *     responses:
 *       405:
 *         description: Méthode non autorisée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 405
 *                 message:
 *                   type: string
 *                   example: "Method Not Allowed"
 *                 error:
 *                   type: string
 *                   example: "POST method is not supported"
 */
export async function POST(): Promise<NextResponse> {
  return NextResponse.json({ status: 405, message: 'Method Not Allowed', error: 'POST method is not supported' });
}

/**
 * @swagger
 * /api/movies:
 *   put:
 *     summary: Mise à jour non autorisée
 *     description: La méthode PUT n'est pas autorisée sur cette route.
 *     responses:
 *       405:
 *         description: Méthode non autorisée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 405
 *                 message:
 *                   type: string
 *                   example: "Method Not Allowed"
 *                 error:
 *                   type: string
 *                   example: "PUT method is not supported"
 */
export async function PUT(): Promise<NextResponse> {
  return NextResponse.json({ status: 405, message: 'Method Not Allowed', error: 'PUT method is not supported' });
}

/**
 * @swagger
 * /api/movies:
 *   delete:
 *     summary: Suppression non autorisée
 *     description: La méthode DELETE n'est pas autorisée sur cette route.
 *     responses:
 *       405:
 *         description: Méthode non autorisée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 405
 *                 message:
 *                   type: string
 *                   example: "Method Not Allowed"
 *                 error:
 *                   type: string
 *                   example: "DELETE method is not supported"
 */
export async function DELETE(): Promise<NextResponse> {
  return NextResponse.json({ status: 405, message: 'Method Not Allowed', error: 'DELETE method is not supported' });
}
