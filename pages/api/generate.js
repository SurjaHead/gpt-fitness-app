import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
Give the essay below a score out of 100. Evaluate it as if you were a IB high school teacher. Provide personalized specific and in-depth feedback on what to improve to get a perfect score. Assess these four areas: strength of arguments relative to the thesis, organization, strength of vocabulary, and convention.

Output in this format:
Arguments:
Organization:
Language:
Convention:

If it is an essay conducting literary analysis, assess the strength of the analysis as well and output it as such:
Analysis: 

Provide at least 8 lines of feedback for each area. Reference specific examples from the essay when suggesting improvements. At the end, provide an overall score and feedback on what needs to be improved to get a perfect score.

Essay: 
`;

const generateAction = async (req, res) => {
	console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

	const baseCompletion = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: `${basePromptPrefix}${req.body.userInput}\n`,
		temperature: 0,
		max_tokens: 1000,
	});

	const basePromptOutput = baseCompletion.data.choices.pop();

	res.status(200).json({ output: basePromptOutput });
};

export default generateAction;