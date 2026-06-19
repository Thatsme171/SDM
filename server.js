const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const uri = "mongodb+srv://dictatorplays266_db_user:sudarshan31@cluster0.5djnzbd.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);
let students;

async function connectDB() {
    await client.connect();
    const db = client.db("school");
    students = db.collection("students");

    console.log("MongoDB Connected");
}
app.use(express.static("public"));

connectDB();


// CREATE
app.post("/students", async (req, res) => {
    const result = await students.insertOne(req.body);
    res.send(result);
});


// READ
app.get("/students", async (req, res) => {
    const data = await students.find().toArray();
    res.send(data);
});


// UPDATE
app.put("/students/:id", async (req, res) => {
    const id = req.params.id;

    const result = await students.updateOne(
        { _id: new ObjectId(id) },
        { $set: req.body }
    );

    res.send(result);
});


// DELETE
app.delete("/students/:id", async (req, res) => {
    const id = req.params.id;

    const result = await students.deleteOne({
        _id: new ObjectId(id)
    });

    res.send(result);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});