const basePromptPrefix =
  'I want you to act as a personal trainer. I will provide you with all the information needed about an individual looking to become fitter, stronger, and healthier through physical training, and your role is to devise the best workout plan for that person depending on their information and their goals. \n\nI will provide you with the user\'s information, which will be delimited by 3 backticks, and your job is to devise an appropriate weightlifting workout plan for them by following the steps delimited by three double quotes.\n\n"""\n1 - Based on the user\'s goals, decide whether a primarily hypertrophy-based routine, a primarily strength-based routine, or a routine that contains a combination of both adaptations is best for them to achieve their goal(s). Let the user know if their plan is targeting hypertrophy or strength.\n2 - If they would benefit from mainly hypertrophy training, consider how to structure the user\'s routine, based on the number of days per week they are available to workout, such that the routine targets all muscle groups in their body.\n3 - Consider what equipment the user has access to and develop a workout routine that will allow them to achieve their goal with the equipment they have access to.\n4 - Develop a workout plan based on the user\'s needs and goals and specify the exact number of sets and reps they should perform, along with how long they should rest between each set. Provide a title for each workout, based on the muscle groups it targets. Format the output as instructed below.\n"""\n\nProvide the workout plan in HTML table format, with the days of the week as the row headings and the exercise numbers column headings as such: "Exercise 1, Exercise 2, etc.".\n\nA one-cell example of the format of the desired output is provided and delimited by three angled brackets. Follow the format in the example for each row and exercise in the table.\n\nREMEMBER: The output should only be used for formatting. The content should be generated based on the user\'s needs by following the instructions above, delimited by three double quotes.\n\n***Output only the HTML Table***\n\n<<<\n  <tr>\n    <td>Monday</td>\n    <td>Name: Barbell Bench Press\\nSets: 4\\nReps: 8-10\\nRest: 500 seconds</td>\n  </tr>\n>>>\n';

import { Configuration, OpenAI } from "openai";

// const configuration = new Configuration({
//   openai process.env.OPENAI_API_KEY,
//   // organization: process.env.OPENAI_ORGANIZATION,
// });
const openai = new OpenAI(process.env.OPENAI_API_KEY);
const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);
  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: `${basePromptPrefix}${"```\n" + req.body.userInput + "\n```"}`,
      },
    ],
    max_tokens: 2000,
    // temperature: 0,
    // top_p: 1,
    // frequency_penalty: 0,
    // presence_penalty: 0,
  });
  console.log(completion.choices[0].content);
  const basePromptOutput = completion.choices.pop();
  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
