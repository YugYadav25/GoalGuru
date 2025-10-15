import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Scholarships DATA and functions
const DATA_PATH = path.join(__dirname, "data.json");
function loadData() {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { scholarships: [] };
  }
}

// College DATA and functions
const COLLEGE_DATA_PATH = path.join(__dirname, 'data-colleges.json');
function loadColleges() {
  try {
    const raw = fs.readFileSync(COLLEGE_DATA_PATH, "utf-8");
    return JSON.parse(raw).colleges || [];
  } catch {
    return [];
  }
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// SCHOLARSHIP endpoints
app.get("/api/states", (_req, res) => {
  const { scholarships } = loadData();
  const set = new Set();
  scholarships.forEach(s => (s.states || []).forEach(st => set.add(st)));
  res.json({ states: Array.from(set).sort() });
});

app.get("/api/scholarships", (req, res) => {
  const { scholarships } = loadData();
  const { state, q } = req.query;
  let result = scholarships;
  if (state && state.trim()) {
    const needle = state.trim().toLowerCase();
    result = result.filter(s => (s.states || []).some(st => st.toLowerCase() === needle));
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

// COLLEGE endpoints
app.get('/api/colleges', (req, res) => {
  let result = loadColleges();
  const {stream, location, type, minRating, maxFees} = req.query;

  if (stream && stream !== "All Streams") {
    result = result.filter(c => (c.stream || "").toLowerCase() === stream.toLowerCase());
  }
  if (location && location !== "All Locations") {
    result = result.filter(c => (c.location || "").toLowerCase().includes(location.toLowerCase()));
  }
  if (type && type !== "All Types") {
    result = result.filter(c => (c.type || "").toLowerCase() === type.toLowerCase());
  }
  if (minRating) {
    result = result.filter(c => c.rating >= parseFloat(minRating));
  }
  if (maxFees) {
    result = result.filter(c => {
      const fee = parseFloat((c.annualFees||'').replace(/[₹,]/g,''));
      return !isNaN(fee) && fee <= parseFloat(maxFees);
    });
  }
  res.json({count: result.length, colleges: result});
});

app.get('/api/college-streams', (_req, res) => {
  const streams = [...new Set(loadColleges().map(c => c.stream))].sort();
  res.json({streams});
});

app.get('/api/college-locations', (_req, res) => {
  const locations = [...new Set(loadColleges().map(c => c.location))].sort();
  res.json({locations});
});

export default app;
