import express from 'express';

const app = express();
app.use(express.json());

app.get("/api/users/user", (req, res) => {
    res.send("Hi there!");
});

app.listen(3000, () => {
    console.log("Listening on 3000!");
});
