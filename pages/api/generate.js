// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
// 	// apiKey: process.env.OPENAI_API_KEY,
// 	apiKey: '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',
// 	organization: "org-4LOysOMzz5TtvgJn2oBEE9DS",
// });

// const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
I want you to act as a personal trainer. I will provide you with all the information needed about an individual looking to become fitter, stronger, and healthier through physical training, and your role is to devise the best workout plan for that person depending on their current fitness level, goals, and lifestyle habits.  

I will provide you with the individual's height, weight, availability, preferred form of exercise, and access to equipment, and your job is to create the optimal workout plan for that person to accomplish their goal. 

`;

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  // organization: process.env.OPENAI_ORGANIZATION,
});
const openai = new OpenAIApi(configuration);
const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: `${basePromptPrefix}${req.body.userInput}` },
    ],
    max_tokens: 2000,
    temperature: 0,
  });
  console.log(completion.data.choices[0].message);
  const basePromptOutput = completion.data.choices.pop();
  res.status(200).json({ output: basePromptOutput });
};
export default generateAction;
