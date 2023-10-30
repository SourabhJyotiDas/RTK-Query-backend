import express from "express";
import { completedNote, createNewNote, deleteNote, getAllNotes, noteDetails, updateNote } from "../controller/note.js";
import { isAuthenticated } from "../middlewares/auth.js";

const Router = express.Router()

Router.route("/posts").get(isAuthenticated, getAllNotes);
Router.route("/create").post(isAuthenticated, createNewNote);
Router.route("/completed/:id").get(isAuthenticated,completedNote)
Router.route("/:id")
   .delete(isAuthenticated, deleteNote)
   .put(isAuthenticated, updateNote)
   .get(isAuthenticated, noteDetails)

export default Router;