const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();

// Replace this with your Hugging Face API key
const hfApiKey = "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";

app.use(bodyParser.json());

app.post('/api/chat', async (req, res) => {
    const { model, messages, max_tokens } = req.body;

    try {
        const response = await axios.post(
            'https://api-inference.huggingface.co/models/Qwen/Qwen2.5-Coder-72B-Instruct',
            {
                inputs: messages,
                parameters: { max_tokens: max_tokens }
            },
            {
                headers: {
                    Authorization: `Bearer ${hfApiKey}`,
                },
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error contacting Hugging Face API');
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
