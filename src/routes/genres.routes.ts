import { Router, Request, Response } from "express";
import { prisma } from "../db.ts";

const router = Router();

// Get all genres
router.get("/genres", async (req: Request, res: Response) => {
  try {
    const genres = await prisma.genre.findMany();
    res.json(genres);
  } catch (error) {
    console.error("Error retrieving genres:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get specific genre by id
router.get("/genres/:id", async (req: Request, res: Response) => {
  const genreId = parseInt(req.params.id);
  try {
    const genre = await prisma.genre.findUnique({
      where: { id: genreId },
    });
    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }
    res.json(genre);
  } catch (error) {
    console.error("Error retrieving genre:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create new genre
router.post("/genres", async (req: Request, res: Response) => {
  try {
    const newGenre = await prisma.genre.create({
      data: req.body,
    });
    res.json(newGenre);
  } catch (error) {
    console.error("Error creating genre:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete genre by id
router.delete("/genres/:id", async (req: Request, res: Response) => {
  const genreId = parseInt(req.params.id);
  try {
    const genre = await prisma.genre.findUnique({
      where: { id: genreId },
    });
    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }

    await prisma.genre.delete({
      where: { id: genreId },
    });

    res.json({ message: "Genre deleted successfully" });
  } catch (error) {
    console.error("Error deleting genre:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
