const express = require('express');
const dotenv = require('dotenv');
const { Configuration, OpenAIApi } = require('openai');

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// OpenAI configuration
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Endpoint to generate script
app.post('/generate-script', async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt,
            max_tokens: 100,
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating script');
    }
});

// Endpoint for chat
app.post('/chat', async (req, res) => {
    const { message } = req.body;
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }],
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error in chat');
    }
});

// Endpoint for narrating avatar
app.post('/narrate-avatar', async (req, res) => {
    const { avatarId } = req.body;
    // Logic to narrate the avatar using OpenAI or another method
    // Placeholder response
    res.json({ message: `Narrating avatar with ID: ${avatarId}` });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});