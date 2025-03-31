import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { Db, MongoClient } from "mongodb";
import clientPromise from "@/lib/mongodb";

/**
 * @swagger
 * /api/movies/{idMovie}:
 *   get:
 *     summary: Récupère un film par son ID
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du film
 *     responses:
 *       200:
 *         description: Film récupéré avec succès
 *       404:
 *         description: Film non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ idMovie: string }> }
): Promise<NextResponse> {
  const { idMovie } = await params;
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("sample_mflix");
    const movie = await db
      .collection("movies")
      .findOne({ _id: new ObjectId(idMovie) });
    if (!movie) {
      return NextResponse.json({ status: 404, message: "Film non trouvé" });
    }
    return NextResponse.json({ status: 200, data: movie });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

/**
 * @swagger
 * /api/movies/{idMovie}:
 *   post:
 *     summary: Ajoute un nouveau film avec un ID spécifique
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du film à ajouter
 *     responses:
 *       201:
 *         description: Film créé avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ idMovie: string }> }
): Promise<NextResponse> {
  const { idMovie } = await params;
  try {
    const data = await request.json();
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("sample_mflix");
    const newMovie = { _id: new ObjectId(idMovie), ...data };
    await db.collection("movies").insertOne(newMovie);
    return NextResponse.json({ status: 201, data: newMovie });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

/**
 * @swagger
 * /api/movies/{idMovie}:
 *   put:
 *     summary: Met à jour un film existant
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du film à mettre à jour
 *     responses:
 *       200:
 *         description: Film mis à jour avec succès
 *       404:
 *         description: Film non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ idMovie: string }> }
): Promise<NextResponse> {
  const { idMovie } = await params;
  try {
    const data = await request.json();
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("sample_mflix");
    const result = await db
      .collection("movies")
      .updateOne({ _id: new ObjectId(idMovie) }, { $set: data });
    if (result.matchedCount === 0) {
      return NextResponse.json({ status: 404, message: "Film non trouvé" });
    }
    return NextResponse.json({ status: 200, message: "Film mis à jour" });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

/**
 * @swagger
 * /api/movies/{idMovie}:
 *   delete:
 *     summary: Supprime un film
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du film à supprimer
 *     responses:
 *       200:
 *         description: Film supprimé avec succès
 *       404:
 *         description: Film non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ idMovie: string }> }
): Promise<NextResponse> {
  const { idMovie } = await params;
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("sample_mflix");
    const result = await db
      .collection("movies")
      .deleteOne({ _id: new ObjectId(idMovie) });
    if (result.deletedCount === 0) {
      return NextResponse.json({ status: 404, message: "Film non trouvé" });
    }
    return NextResponse.json({ status: 200, message: "Film supprimé" });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
