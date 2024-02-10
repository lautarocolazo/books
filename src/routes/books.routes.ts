import { Router, Request, Response } from "express";
import { prisma } from "../db.ts";

const router = Router();

// Get all books
router.get("/books", async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        genre: true,
      },
    });
    res.json(books);
  } catch (error) {
    console.error("Error retrieving books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get specific book by id
router.get("/books/:id", async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id);
  try {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    console.error("Error retrieving book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create new book
router.post("/books", async (req: Request, res: Response) => {
  try {
    const newBook = await prisma.book.create({
      data: req.body,
    });
    res.json(newBook);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete book by id
router.delete("/books/:id", async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id);
  try {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    await prisma.book.delete({
      where: { id: bookId },
    });

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
