const express = require('express');
const axios = require('axios');
const Recommendation = require('../models/Recommendation');

const router = express.Router();

router.post('/recommend', async (req, res) => {
  try {
    const { skills, interests, careerGoal } = req.body;

    if (!skills || !interests || !careerGoal) {
      return res.status(400).json({ error: 'Please provide skills, interests, and career goal.' });
    }

    const prompt = `You are an expert AI career and education counselor. 
A student has provided the following profile:
- Skills: ${skills}
- Interests: ${interests}
- Career Goal: ${careerGoal}

IMPORTANT: First evaluate the profile. If the inputs are gibberish, placeholder text (like "abc", "test"), or completely lack meaningful context to make a real recommendation, you MUST reject it by returning the following JSON exactly and nothing else:
{ "error": "Please provide more specific and meaningful details about your skills, interests, and career goals." }

If the profile is valid, recommend:
1. Courses (specific names/topics)
2. Learning paths (step-by-step skill acquisition)
3. Certifications (industry-recognized credentials)

For each recommendation, you MUST provide a detailed explanation of "Why this course/path/certification is suitable" connecting it directly to their skills, interests, and career goal.

Output your response strictly in the following JSON format (or the error JSON above):
{
  "courses": [
    { "title": "Course Name", "description": "Brief description", "whySuitable": "Explanation" }
  ],
  "learningPaths": [
    { "title": "Path Name", "steps": ["Step 1", "Step 2"], "whySuitable": "Explanation" }
  ],
  "certifications": [
    { "title": "Cert Name", "provider": "Provider Name", "whySuitable": "Explanation" }
  ]
}`;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'google/gemini-2.5-flash',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5000', 
          'X-Title': 'Course Recommendation Platform'
        },
      }
    );

    let aiContent = response.data.choices[0].message.content;
    
    // Clean up markdown formatting if present
    if (aiContent.startsWith('```json')) {
      aiContent = aiContent.substring(7, aiContent.length - 3);
    } else if (aiContent.startsWith('```')) {
      aiContent = aiContent.substring(3, aiContent.length - 3);
    }
    
    const parsedData = JSON.parse(aiContent.trim());

    if (parsedData.error) {
      return res.status(400).json({ error: parsedData.error });
    }

    // Save to database
    const newRecommendation = new Recommendation({
      skills,
      interests,
      careerGoal,
      courses: parsedData.courses || [],
      learningPaths: parsedData.learningPaths || [],
      certifications: parsedData.certifications || []
    });

    await newRecommendation.save();

    res.json(newRecommendation);
  } catch (error) {
    console.error('Error in /recommend:', error.message);
    if(error.response) {
      console.error('API Error Data:', error.response.data);
      return res.status(500).json({ error: 'Failed to generate recommendations.', details: error.response.data });
    }
    res.status(500).json({ error: 'Failed to generate recommendations.', details: error.message });
  }
});

// Endpoint to fetch history if needed
router.get('/history', async (req, res) => {
  try {
    const history = await Recommendation.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch history.' });
  }
});

module.exports = router;
