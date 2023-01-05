const express = require(`express`);
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require(`../middleware/fetchuser`);
const Notes = require(`../models/Notes`);

// ROUTE 1: Get All the Notes using: GET "/api/notes/fetchAllNotes"
router.get(`/fetchAllNotes`, fetchuser, async (req, res) => {
  console.log("req => " + req.user.id);
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

// ROUTE 2: Add note Post "/api/notes/addNote"
router.post(`/addNote`,fetchuser,[body('description',"Description atleast 5 character").isLength({min: 5})],async (req, res) => {
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
      res.status(500).send("Error occcur");
    }
  }
);
module.exports = router;