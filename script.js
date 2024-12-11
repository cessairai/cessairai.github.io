// Assuming you have the Hugging Face Inference client and model set up.

document.getElementById('send-button').addEventListener('click', async function() {
    const userInput = document.getElementById('user-input').value;
    
    if (!userInput) {
        alert('Please enter a question!');
        return;
    }

    // Call the Hugging Face API (backend or directly if configured)
    try {
        const response = await fetch('/api/chat', { // Your backend endpoint for the API request
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'Qwen/Qwen2.5-Coder-32B-Instruct',
                messages: [{ role: 'user', content: userInput }],
                max_tokens: 500
            })
        });
        const data = await response.json();

        // Update the output box with the AI response
        document.getElementById('output').value = data.choices[0].message.content;

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('output').value = 'Error processing the request.';
    }
});
