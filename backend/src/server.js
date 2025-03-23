const express = require('express');
const app = express();
const cors = require("cors");

const PORT = 8080;

app.use(cors());

app.get("/", (req, res) => {
    res.send("HelloWorld!");
});

app.get("/api/home", (req, res) => {
    res.json({ message: "Hello World!", people: ["Harry", "Jack", "Barry"] });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
