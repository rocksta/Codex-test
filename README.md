# Codex-test

This repository contains two demos:

1. **Duck Hunt Clone** – a simple game built with HTML5 Canvas.
2. **Interview Assistant** – an example Node.js project that uses the OpenAI Live API to simulate a real-time interview with an AI candidate.

## Duck Hunt
Open `index.html` in a modern web browser. Use the mouse to shoot ducks. Each round gives you three bullets. Try to shoot the duck before you run out of bullets!

## Interview Assistant
To run the interview assistant you need Node.js installed. The assistant streams answers from the OpenAI API using websockets.

```bash
cd interview-assistant
npm install
OPENAI_API_KEY=your-key npm start
```

Then open `http://localhost:3000` in your browser and ask questions in the text box. Answers will appear in real time.
