// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
// 	// apiKey: process.env.OPENAI_API_KEY,
// 	apiKey: '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',
// 	organization: "org-4LOysOMzz5TtvgJn2oBEE9DS",
// });

// const openai = new OpenAIApi(configuration);

const basePromptPrefix =
  'I want you to act as a personal trainer. I will provide you with all the information needed about an individual looking to become fitter, stronger, and healthier through physical training, and your role is to devise the best workout plan for that person depending on their information and their goals. \nI will provide you with the user\'s information, which will be delimited by 3 backticks, and your job is to devise an appropriate workout plan for them by following the steps delimited by three double quotes.\n\n"""\n1 - Extract whether they prefer weightlifting or cardio workouts.\n2 - If they like weightlifting, decide whether primarily hypertrophy-based training or strength-based training will be more effective for them. If they like cardio, decide how much of their exercise should be low vs moderate vs high-intensity training. \n3 - Based on the number of days per week they can train, consider the most optimal way for them to develop their entire body and select the appropriate exercises.\n4 - Create a plan for each day that they plan to train and include the specific exercises, why you chose each exercise, and how to measure progress for each exercise.\n"""\n\nProvide the workout plan in JSON format, with the days of the week as keys.\n\n';

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
