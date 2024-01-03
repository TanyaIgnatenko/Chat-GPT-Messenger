function sendPrompt(prompt: string) {
    return fetch('https://212.164.218.218:5000/send-prompt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": prompt}],
            temperature: 0.7
        })
    }).then(resp => resp.json())
    .then(resp => resp.choices[0].message.content);
}

const API = {
    sendPrompt
}

export default API;