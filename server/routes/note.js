import express from 'express'
import Note from '../models/Note.js';
import middleware from '../middleware/middleware.js';

const router = express.Router()

// ✅ ADD NOTE
router.post('/add', middleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const newNote = new Note({
      title,
      description,
      userId: req.user.id
    });

    await newNote.save();

    return res.status(200).json({
      success: true,
      message: "Note Created Successfully"
    });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Error in Adding Note"
    });
  }
});


// ✅ GET NOTES (FIXED)
router.get('/', middleware, async (req, res) => {
  try {
    console.log("USER:", req.user);

    const notes = await Note.find({ userId: req.user.id }); // ✅ FIXED

    return res.status(200).json({
      success: true,
      notes
    });

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Cannot retrieve notes"
    });
  }
});


// ✅ UPDATE NOTE (ADD middleware)
router.put("/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;

    const updatedNote = await Note.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(200).json({
      success: true,
      updatedNote
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot update note"
    });
  }
});


// ✅ DELETE NOTE (ADD middleware)
router.delete("/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await Note.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      deletedNote
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Cannot delete note"
    });
  }
});

export default router;