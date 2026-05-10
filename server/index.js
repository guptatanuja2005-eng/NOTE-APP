
import express from 'express'
import cors from 'cors'
import connectToMongoDB from './db/db.js'
import noteRouter from './routes/note.js'

import authRouter from './routes/auth.js'

const app = express()
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is working");
});

app.get("/health", (req, res) => {
  res.json({ success: true, message: "Server healthy" });
});


app.use("/api/auth", authRouter);
app.use("/api/note", noteRouter);

connectToMongoDB()
app.listen(5001,() => {
    console.log("Server is running on port 5001");
});