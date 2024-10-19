import express from 'express';
import Job from '../models/Job.js'; 

const router = express.Router();
router.post('/', async (req, res) => {
  const { name, email, contact, address } = req.body;

  
  if (!name || !email || !contact || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newJob = new Job({
      name,
      email,
      contact,
      address
    });

    const savedJob = await newJob.save(); 
    res.status(201).json(savedJob); 
  } catch (error) {
    console.error('Error details:', error);  
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find(); 
    res.status(200).json(jobs); 
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


export default router; 
