import { Configuration, OpenAIApi } from "openai";

import type { NextApiRequest, NextApiResponse } from "next";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body;
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `The following is a conversation with an AI assistant. The assistant is helpful, creative, cleaver. \nHuman: ${prompt}\nAI`,
      max_tokens: 1024,
      temperature: 0.6, // 低いと保守的、高いと多様性が高い
      frequency_penalty: 0.5, // 高いと希少な単語が得られる
      presence_penalty: 0, // 高いと入力値の頻度が高いものを重視する
    });

    const text = response.data.choices[0].text;

    res.status(200).json({ text });
  } catch (e) {
    console.log("e:", e);
    res.status(500).send({ message: "Something went wrong" });
  }
}
