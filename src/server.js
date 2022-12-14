import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`Server running on port ${PORT}`);
});
