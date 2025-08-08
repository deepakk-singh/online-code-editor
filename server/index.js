require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
import cors from "cors"; // or const cors = require("cors");


const app = express();

// ---------------- Middleware ----------------
app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(bodyParser.json());

// Rate limiting to prevent abuse
app.use(
  '/run',
  rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 30, // max requests per minute
    message: { error: 'Too many requests, please try again later.' }
  })
);

app.use(cors({
  origin: "https://online-code-editor-three-mu.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ---------------- Config ----------------
const JUDGE0_API =
  'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true';

const JUDGE0_HEADERS = {
  'Content-Type': 'application/json',
  'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
  'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
};

// Load language IDs from JSON file
const languagesFile = path.join(__dirname, 'languages.json');
let languageIds = {};
if (fs.existsSync(languagesFile)) {
  languageIds = JSON.parse(fs.readFileSync(languagesFile, 'utf8'));
} else {
  languageIds = {
    javascript: 63,
    python: 71,
    cpp: 54,
    c: 50,
    java: 62,
    mysql: 82,
  };
}

// ---------------- Routes ----------------
app.post('/run', async (req, res) => {
  const { code, language, stdin } = req.body;

  if (!code || !language) {
    return res
      .status(400)
      .json({ success: false, error: 'Code and language are required.' });
  }

  const language_id = languageIds[language];
  if (!language_id) {
    return res
      .status(400)
      .json({ success: false, error: `Language '${language}' not supported.` });
  }

  try {
    const response = await axios.post(
      JUDGE0_API,
      {
        source_code: code,
        language_id,
        stdin: stdin || '',
      },
      { headers: JUDGE0_HEADERS }
    );

    const { stdout, stderr, compile_output, message } = response.data;

    res.json({
      success: true,
      output:
        stdout || stderr || compile_output || message || 'No output from the compiler.',
    });
  } catch (error) {
    console.error('Judge0 API Error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error:
        error.response?.data?.error || error.message || 'Unknown server error.',
    });
  }
});

// ---------------- Server ----------------
require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
