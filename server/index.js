import express from 'express';
import cors from 'cors';
import { setupDatabase } from './database.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let db;

setupDatabase().then(database => {
  db = database;
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
}).catch(console.error);

// ---------------- AUTH API ----------------
app.post('/api/register', async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const result = await db.run(`INSERT INTO users (username, password, role) VALUES (?, ?, ?)`, [username, password, role]);
    res.json({ id: result.lastID, username, role });
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed')) {
      res.status(400).json({ error: "Username already exists" });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
    if (user) {
      res.json({ id: user.id, username: user.username, role: user.role });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- PROFILE API ----------------
app.get('/api/profile', async (req, res) => {
  try {
    const profile = await db.get('SELECT * FROM profile LIMIT 1');
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/profile', async (req, res) => {
  try {
    const data = req.body;
    await db.run(`
      UPDATE profile SET 
        mobileNumber = ?, personalEmail = ?, currentAddress = ?, permanentAddress = ?,
        emergencyContactName = ?, emergencyContactNumber = ?, relationship = ?,
        profilePhoto = ?, passportNumber = ?, drivingLicenseNumber = ?
      WHERE id = 1
    `, [
      data.mobileNumber, data.personalEmail, data.currentAddress, data.permanentAddress,
      data.emergencyContactName, data.emergencyContactNumber, data.relationship,
      data.profilePhoto, data.passportNumber, data.drivingLicenseNumber
    ]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- ATTENDANCE API ----------------
app.get('/api/attendance', async (req, res) => {
  try {
    // Return all attendance records; frontend will filter, or we could filter here.
    // For simplicity, returning all and letting frontend filter.
    const attendance = await db.all('SELECT * FROM attendance ORDER BY id ASC');
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- LEAVE API ----------------
app.get('/api/leave', async (req, res) => {
  try {
    const leaves = await db.all('SELECT * FROM leave_requests ORDER BY id DESC');
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/leave', async (req, res) => {
  try {
    const { type, duration, days, reason, status } = req.body;
    const result = await db.run(`
      INSERT INTO leave_requests (type, duration, days, reason, status)
      VALUES (?, ?, ?, ?, ?)
    `, [type, duration, days, reason, status]);
    
    const newRequest = await db.get('SELECT * FROM leave_requests WHERE id = ?', result.lastID);
    res.json(newRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------- HOLIDAYS API ----------------
app.get('/api/holidays', async (req, res) => {
  try {
    const holidays = await db.all('SELECT * FROM holidays ORDER BY id ASC');
    res.json(holidays);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
