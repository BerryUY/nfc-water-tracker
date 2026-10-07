import express from "express";
import db from "./db"

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
    const logs = db.prepare(`
        SELECT * FROM water_logs ORDER BY created_at DESC
        `).all();

    res.json(logs);
});

app.get("/drink", (_req, res) => {
    db.prepare(`
        INSERT INTO water_logs (amount)
        VALUES (500)
        `).run();

        res.send("+500ml registrado");
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})