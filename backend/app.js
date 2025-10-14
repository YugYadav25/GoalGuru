import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

// Setup __dirname in ES Module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const DATA_PATH = path.join(__dirname, "data.json");

function loadData() {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { scholarships: [] };
  }
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Distinct states for dropdown
app.get("/api/states", (_req, res) => {
  const { scholarships } = loadData();
  const set = new Set();
  scholarships.forEach(s => (s.states || []).forEach(st => set.add(st)));
  res.json({ states: Array.from(set).sort() });
});

// Scholarship filter by state (and optional search)
app.get("/api/scholarships", (req, res) => {
  const { scholarships } = loadData();
  const { state, q } = req.query;
  let result = scholarships;

  if (state && state.trim()) {
    const needle = state.trim().toLowerCase();
    result = result.filter(s =>
      (s.states || []).some(st => st.toLowerCase() === needle)
    );
  }

  if (q && q.trim()) {
    const term = q.trim().toLowerCase();
    result = result.filter(
      s =>
        (s.name || "").toLowerCase().includes(term) ||
        (s.provider || "").toLowerCase().includes(term)
    );
  }

  res.json({ count: result.length, scholarships: result });
});

export default app;
