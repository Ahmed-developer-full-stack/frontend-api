const express = require("express");
const app = express();
const PORT = 8080;

app.use(express.json());

let roadmaps = [
  {
    id: 1,
    title: "HTML",
    description: "Basics of HTML",
    completed: false,
    category: "frontend",
    order: 1,
  },
];

app.post("/api/roadmaps", (req, res) => {
  const { title, description, completed, category } = req.body;
  const newRoadmap = {
    id: Date.now(),
    order: roadmaps.length + 1,
    title,
    description,
    completed,
    category,
  };
  roadmaps.push(newRoadmap);
  res.status(201).json(newRoadmap);
});

app.get("/api/roadmaps", (req, res) => {
  res.json(roadmaps);
});
app.put("/api/roadmaps/:id", (req, res) => {
  const roadmapId = parseInt(req.params.id);
  const index = roadmaps.findIndex((r) => r.id === roadmapId);
  if (index === -1) return res.status(404).json({ error: "Not found" });

  roadmaps[index] = { ...roadmaps[index], ...req.body };
  res.json(roadmaps[index]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
