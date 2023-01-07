const express = require(`express`);
const router = express.Router();
const { body, validationResult } = require("express-validator");
const fetchuser = require(`../middleware/fetchuser`);
const Notes = require(`../models/Notes`);

// ROUTE 1: Get All the Notes using: GET "/api/notes/fetchAllNotes"  , Need to login
router.get(`/fetchAllNotes`, fetchuser, async (req, res) => {
  console.log("req => " + req.user.id);
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

// ROUTE 2: Add note Post "/api/notes/addNote"
router.post(
  `/addNote`,
  fetchuser,
  [body("description", "Description atleast 5 character").isLength({ min: 5 })],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      console.log("req => " + req.user.id);
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNotes = await notes.save();
      res.json(saveNotes);
    } catch (error) {
      return res.status(500).send("Error occcur");
    }
  }
);

// ROUTE 3: Update an existing  Note using Put "/api/notes/updateNote" ,  Need to login
router.put(`/updateNote/:id`, fetchuser, async (req, res) => {
  const { title, description, tag } = req.body; // Destructuring
  // Create a newNote object
  const newNote = {};
  if (title) {
    newNote.title = title;
  }
  if (description) {
    newNote.description = description;
  }
  if (tag) {
    newNote.tag = tag;
  }

  //Find the note to be updated and
  let note = await Notes.findById(req.params.id);
  if (!note) {
    res.status(404).send("Not Found");
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not Allowed");
  }

  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json({ note });
});

// ROUTE 4: Delete an existing  Note using Delete "/api/notes/deletenote" , Need to login
router.delete(`/deleteNote/:id`, fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body; // Destructuring

    //Find the note to be updated and
    let note = await Notes.findById(req.params.id);
    console.log("Note ==> " + note);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ "Success ": "Note has been deleted", note: note });
  } catch (error) {
    return res.status(500).send("Error occcur");
  }
});
module.exports = router;
