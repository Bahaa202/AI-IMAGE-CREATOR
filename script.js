const YOUR_API_KEY = "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";
document.getElementById('generateBtn').addEventListener('click', generateImage);

async function generateImage() {
    const prompt = document.getElementById('promptInput').value;
    if (!prompt) {
        alert('Please enter a prompt!');
        return;
    }

    try {
        const response = await fetch('https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${YOUR_API_KEY}`
            },
            body: JSON.stringify({
                "model": "dall-e-3",
                "prompt": prompt,  // Fixed: Use the prompt directly
                "n": 1,  // Generate 1 image for now
                "size": "1024x1024"  // Correct size format
            })
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error:', error);
            alert(`Error: ${error.error.message}`);
            return;
        }

        const data = await response.json();
        const imageUrl = data.data[0].url;  // Corrected way to access the image URL
        displayImage(imageUrl);

    } catch (error) {
        console.error('Fetch error:', error);
        alert('An error occurred while generating the image. Please try again.');
    }
}

function displayImage(imageUrl) {
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
}
