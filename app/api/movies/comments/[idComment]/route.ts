import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { Db, MongoClient } from "mongodb";
import clientPromise from "@/lib/mongodb";

/**
 * @swagger
 * /api/movies/comments/{idComment}:
 *   get:
 *     summary: Récupère un commentaire par son ID
 *     parameters:
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du commentaire
 *     responses:
 *       200:
 *         description: Commentaire récupéré avec succès
 *       404:
 *         description: Commentaire non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ idComment: string }> }
): Promise<NextResponse> {
  const { idComment } = await params;
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("sample_mflix");
    const comment = await db
      .collection("comments")
      .findOne({ _id: new ObjectId(idComment) });
    if (!comment) {
      return NextResponse.json({
        status: 404,
        message: "Commentaire non trouvé",
      });
    }
    return NextResponse.json({ status: 200, data: comment });
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
 * /api/movies/comments/{idComment}:
 *   post:
 *     summary: Ajoute un nouveau commentaire avec un ID spécifique
 *     parameters:
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du commentaire à ajouter
 *     responses:
 *       201:
 *         description: Commentaire créé avec succès
 *       500:
 *         description: Erreur interne du serveur
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ idComment: string }> }
): Promise<NextResponse> {
  const { idComment } = await params;
  try {
    const data = await request.json();
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("sample_mflix");
    const newComment = { _id: new ObjectId(idComment), ...data };
    await db.collection("comments").insertOne(newComment);
    return NextResponse.json({ status: 201, data: newComment });
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
 * /api/movies/comments/{idComment}:
 *   put:
 *     summary: Met à jour un commentaire existant
 *     parameters:
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du commentaire à mettre à jour
 *     responses:
 *       200:
 *         description: Commentaire mis à jour avec succès
 *       404:
 *         description: Commentaire non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ idComment: string }> }
): Promise<NextResponse> {
  const { idComment } = await params;
  try {
    const data = await request.json();
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("sample_mflix");
    const result = await db
      .collection("comments")
      .updateOne({ _id: new ObjectId(idComment) }, { $set: data });
    if (result.matchedCount === 0) {
      return NextResponse.json({
        status: 404,
        message: "Commentaire non trouvé",
      });
    }
    return NextResponse.json({
      status: 200,
      message: "Commentaire mis à jour",
    });
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
 * /api/movies/comments/{idComment}:
 *   delete:
 *     summary: Supprime un commentaire
 *     parameters:
 *       - in: path
 *         name: idComment
 *         required: true
 *         schema:
 *           type: string
 *         description: L'ID du commentaire à supprimer
 *     responses:
 *       200:
 *         description: Commentaire supprimé avec succès
 *       404:
 *         description: Commentaire non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ idComment: string }> }
): Promise<NextResponse> {
  const { idComment } = await params;
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("sample_mflix");
    const result = await db
      .collection("comments")
      .deleteOne({ _id: new ObjectId(idComment) });
    if (result.deletedCount === 0) {
      return NextResponse.json({
        status: 404,
        message: "Commentaire non trouvé",
      });
    }
    return NextResponse.json({ status: 200, message: "Commentaire supprimé" });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
