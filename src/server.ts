import express from "express";
import db from "./db";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
    const logs = db
        .prepare("SELECT * FROM water_logs ORDER BY created_at DESC")
        .all();

const total = db
    .prepare(`
        SELECT COALESCE(SUM(amount), 0) AS total
        FROM water_logs
        WHERE DATE(created_at) = DATE('now')
    `)
    .get() as { total: number };

    res.send(`
        <html>
            <body>
                <h1>${total.total} ml hoy</h1>
            
                <form action="/undo" method="POST">
                <button type="submit">Deshacer último</button>
                </form>
            
                <pre>${JSON.stringify(logs, null, 2)}</pre>
            </body>
        </html>
    `);
});

app.get("/drink", (_req, res) => {
    db.prepare(
        `
        INSERT INTO water_logs (amount)
        VALUES (500)
        `,
    ).run();

    res.redirect("/");
});

app.post("/undo", (_req, res) => {
    const last = db
        .prepare(`
            SELECT id
            FROM water_logs
            ORDER BY id DESC
            LIMIT 1
        `)
        .get() as { id: number } | undefined;

    if (!last) {
        return res.redirect("/");
    }

    db.prepare("DELETE FROM water_logs WHERE id = ?").run(last.id);

    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
