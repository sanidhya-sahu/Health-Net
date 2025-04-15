const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 80;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // Use environment variable in production!

app.use(cors());
app.use(bodyParser.json());
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
}));
// Data storage paths
const dataPath = path.join(__dirname, 'data');
const cyclesFile = path.join(dataPath, 'cycles.json');
const usersFile = path.join(dataPath, 'users.json');

// Ensure data directory exists
if (!fs.existsSync(dataPath)) {
  fs.mkdirSync(dataPath, { recursive: true });
}

// Ensure cycles.json exists with default empty array
if (!fs.existsSync(cyclesFile)) {
  fs.writeFileSync(cyclesFile, JSON.stringify([]));
}

// Ensure users.json exists with default empty array
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, JSON.stringify([]));
}

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// User Registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Check if email already exists
    const users = JSON.parse(fs.readFileSync(usersFile));
    if (users.some(user => user.email === email)) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password: hashedPassword
    };
    
    users.push(newUser);
    fs.writeFileSync(usersFile, JSON.stringify(users));
    
    // Create token
    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '24h' });
    
    res.status(201).json({ token, userId: newUser.id, username: newUser.username });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    
    // Find user
    const users = JSON.parse(fs.readFileSync(usersFile));
    const user = users.find(user => user.email === email);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Validate password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    
    // Create token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '24h' });
    
    res.json({ token, userId: user.id, username: user.username });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get user profile
app.get('/api/auth/profile', authenticateToken, (req, res) => {
  try {
    const users = JSON.parse(fs.readFileSync(usersFile));
    const user = users.find(user => user.id === req.user.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Don't send password back to client
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get user profile' });
  }
});

// Modified route to get cycles for the authenticated user
app.get('/api/cycles', authenticateToken, (req, res) => {
  try {
    const allCycles = JSON.parse(fs.readFileSync(cyclesFile));
    // Filter cycles for the authenticated user
    const userCycles = allCycles.filter(cycle => cycle.userId === req.user.id);
    res.json(userCycles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read cycle data' });
  }
});

// Modified route to add cycle for the authenticated user
app.post('/api/cycles', authenticateToken, (req, res) => {
  try {
    const { startDate, endDate, symptoms, notes } = req.body;
    
    if (!startDate) {
      return res.status(400).json({ error: 'Start date is required' });
    }
    
    const cycles = JSON.parse(fs.readFileSync(cyclesFile));
    const newCycle = {
      id: Date.now().toString(),
      userId: req.user.id, // Associate cycle with authenticated user
      startDate,
      endDate,
      symptoms: symptoms || [],
      notes: notes || ''
    };
    
    cycles.push(newCycle);
    fs.writeFileSync(cyclesFile, JSON.stringify(cycles));
    
    res.status(201).json(newCycle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add cycle data' });
  }
});

// Modified route to update cycle with authentication check
app.put('/api/cycles/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    const { startDate, endDate, symptoms, notes } = req.body;
    
    const cycles = JSON.parse(fs.readFileSync(cyclesFile));
    const index = cycles.findIndex(cycle => cycle.id === id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Cycle not found' });
    }
    
    // Ensure user can only update their own cycles
    if (cycles[index].userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this cycle' });
    }
    
    cycles[index] = {
      ...cycles[index],
      startDate: startDate || cycles[index].startDate,
      endDate: endDate || cycles[index].endDate,
      symptoms: symptoms || cycles[index].symptoms,
      notes: notes || cycles[index].notes
    };
    
    fs.writeFileSync(cyclesFile, JSON.stringify(cycles));
    res.json(cycles[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update cycle data' });
  }
});

// Modified route to delete cycle with authentication check
app.delete('/api/cycles/:id', authenticateToken, (req, res) => {
  try {
    const { id } = req.params;
    
    const cycles = JSON.parse(fs.readFileSync(cyclesFile));
    const cycleToDelete = cycles.find(cycle => cycle.id === id);
    
    if (!cycleToDelete) {
      return res.status(404).json({ error: 'Cycle not found' });
    }
    
    // Ensure user can only delete their own cycles
    if (cycleToDelete.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this cycle' });
    }
    
    const filteredCycles = cycles.filter(cycle => cycle.id !== id);
    fs.writeFileSync(cyclesFile, JSON.stringify(filteredCycles));
    res.json({ message: 'Cycle deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete cycle data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
