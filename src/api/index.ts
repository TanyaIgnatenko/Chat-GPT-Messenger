function sendPrompt(prompt: string) {
    return fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_CHAT_GPT_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": prompt}],
            temperature: 0.7
        })
    }).then(resp => resp.json())
    .then(resp => resp.choices[0].message.content);
}

export default {
    sendPrompt
};