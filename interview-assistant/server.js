const express = require('express');
const { WebSocketServer } = require('ws');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/client'));

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const wss = new WebSocketServer({ server });

// Replace with your OpenAI API key
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

wss.on('connection', ws => {
  let openaiStream;

  ws.on('message', async msg => {
    const text = msg.toString();
    // Start new session with system prompt
    openaiStream = await openai.chat.completions.create({
      model: 'gpt-4o-realtime',
      messages: [
        { role: 'system', content: 'Ты — опытный iOS-разработчик с 5-летним опытом. Ты участвуешь в собеседовании на позицию Senior iOS Engineer. Отвечай так, как будто ты настоящий человек: используй примеры из практики, упоминай технологии (Swift, Combine, UIKit, AVKit), избегай абстракций. Отвечай уверенно, иногда переспрашивай или уточняй вопрос, если он неясен.' },
        { role: 'user', content: text }
      ],
      stream: true
    });

    for await (const part of openaiStream) {
      const token = part.choices[0]?.delta?.content || '';
      if (token) {
        ws.send(token);
      }
    }

    ws.send('\n');
  });

  ws.on('close', () => {
    if (openaiStream) {
      openaiStream.controller.abort();
    }
  });
});
