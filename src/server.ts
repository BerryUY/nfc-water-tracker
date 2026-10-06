import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
    res.send("NFC water tracker funcionando");
});

app.listen(PORT, () => {
    console.log(`https://localhost:${PORT}`);
})