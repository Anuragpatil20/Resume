const express = require('express');
const multer = require('multer');
const path = require('path');
const Resume = require('../models/Resume');
const User = require('../models/User');
const router = express.Router();

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage, fileFilter: (req, file, cb) => {
  if (file.mimetype === 'application/pdf') cb(null, true);
  else cb(new Error('Only PDFs are allowed!'));
}});

// POST: Upload resume
router.post('/users/:id/upload-resume', upload.single('resume'), async (req, res) => {
  try {
    const { id } = req.params;
    const resume = new Resume({
      userId: id,
      filePath: req.file.path,
    });
    await resume.save();
    res.status(200).json({ message: 'Resume uploaded successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: List all resumes
router.get('/resumes', async (req, res) => {
  try {
    const resumes = await Resume.find().populate('userId', 'name email');
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Download resume
router.get('/resumes/:id/download', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    res.download(resume.filePath);
  } catch (err) {
    res.status(404).json({ error: 'Resume not found' });
  }
});

module.exports = router;
