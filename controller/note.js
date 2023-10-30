
import { Notes } from "../models/Notes.js"

export const createNewNote = async (req, res) => {
   try {
      const { title, description } = req.body;
      if (!title || !description) return res.status(500).json({ success: false, message: "Add all feilds" })

      let note = await Notes.create({ title, description, owner: req.user });

      res.status(200).json({ success: true, note });
   } catch (error) {
      return res.status(200).json({ success: false, message: error.message })
   }
}



export const updateNote = async (req, res) => {
   try {
      let note = await Notes.findById(req.params.id)
      if (!note) return res.status(500).json({ success: false, message: "Note not Found" });

      if (req.body.title) {
         note.title = req.body.title;
      }
      if (req.body.description) {
         note.description = req.body.description;
      }
      await note.save();
      res.status(200).json({ success: true, message: "Updated Succesfully" });
   } catch (error) {
      return res.status(200).json({ success: false, message: error.message })
   }
}



export const noteDetails = async (req, res) => {
   try {
      const { id } = req.params;
      let note = await Notes.findById(id);

      res.status(200).json({ success: true, note });
   } catch (error) {
      return res.status(200).json({ success: false, message: error.message })
   }
}


export const deleteNote = async (req, res) => {
   try {
      const { id } = req.params;

      let note = await Notes.findById(id);

      if (!note) return res.status(500).json({ success: false, message: "Note not Found" })
      await note.deleteOne();
      res.status(200).json({ success: true, message: "Deleted Successfully" });
   } catch (error) {
      return res.status(200).json({ success: false, message: error.message })
   }
}


export const getAllNotes = async (req, res) => {
   try {
      let notes = await Notes.find({})
      let mynotes = []
      for (let i = 0; i < notes.length; i++) {
         if (String(notes[i].owner) === String(req.user._id)) {
            mynotes.unshift(notes[i])
         }
      }
      res.status(200).json({ success: true, mynotes });
   } catch (error) {
      return res.status(200).json({ success: false, message: error.message })
   }
}


export const completedNote = async (req,res) => {
   try {
      const { id } = req.params;

      let note = await Notes.findById(id);
      if (!note) return res.status(500).json({ success: false, message: "Note not Found" });

      note.isCompleted = !note.isCompleted;

      await note.save();

      res.status(200).json({ success: true, note });

   } catch (error) {
      return res.status(500).json({ success: false, message: error.message })
   }
}

