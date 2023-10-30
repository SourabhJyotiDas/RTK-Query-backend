import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();


app.use(express.json())
app.use(cookieParser())
app.use(cors())


import path from "path";
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "./client/build")))    // deploy only

app.get('/', async (req, res) => {
   res.sendFile(path.join(__dirname, './client/build/index.html'));
});


// app.get('/', async (req, res) => {
//    res.send("<h1>Working Fine</h1>")
// });


import user from "./routes/user.js"
import note from "./routes/note.js"

app.use("/api/v1", user)
app.use("/api/v1", note)


export default app;