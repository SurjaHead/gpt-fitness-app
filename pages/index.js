import Head from "next/head";
import Image from "next/image";
import buildspaceLogo from "../assets/buildspace-logo.png";
import { useState } from "react";

const Home = () => {
	const [userInput, setUserInput] = useState("");
	const [apiOutput, setApiOutput] = useState("");
	const [isGenerating, setIsGenerating] = useState(false);

	const callGenerateEndpoint = async () => {
		setIsGenerating(true);

		console.log("Calling OpenAI...");
		const completion = await fetch("/api/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			
			},
			body: JSON.stringify({ userInput }),
		});

		const data = await completion.json();
		const { output } = data;
		console.log("OpenAI replied...", output.message.content);
		console.log(data)

		setApiOutput(`${output.message.content}`);
		setIsGenerating(false);
	};

	const onUserChangedText = (event) => {
		console.log(event.target.value);
		setUserInput(event.target.value);
	};

	return (
		<div className="root">
			<Head>
				<title>GPT-3 Writer | buildspace</title>
			</Head>
			<div className="container">
				<div className="header">
					<div className="header-title">
						{/* Change your headline here */}
						<h1>Get customized workout & meal plans.</h1>
					</div>
					<div className="header-subtitle">
						<h2>
							Give us your information and preferences below and we'll generate the perfect workout plan and meal plan for you. Give your information in the following format: </h2>
							<h2>Height:</h2>
							<h2>Weight:</h2>
							<h2>Activity level:</h2>
							<h2>Availability:</h2>
							<h2>Access to equipment:</h2>
							<h2>Diet restrictions:</h2>
							<h2>Disliked foods:</h2>
							<h2>Goals:</h2>
						
					</div>
				</div>

				<div className="prompt-container">
					<textarea
						placeholder="start typing here"
						className="prompt-box"
						value={userInput}
						onChange={onUserChangedText}
					/>
					<div className="prompt-buttons">
						<a
							className={
								isGenerating ? "generate-button loading" : 
								"generate-button"
							}
							onClick={callGenerateEndpoint}
						>
							<div className="generate">
								{isGenerating ? (
									<span className="loader"></span>
								) : (
									<p>Generate</p>
								)}
							</div>
						</a>
					</div>
					{/* New code I added here */}
					{apiOutput && (
						<div className="output">
							<div className="output-header-container">
								<div className="output-header">
									<h3>Output</h3>
								</div>
							</div>
							<div className="output-content">
								<p>{apiOutput}</p>
							</div>
						</div>
					)}
				</div>
			</div>
			<div className="badge-container grow">
				<a
					href="https://buildspace.so/builds/ai-writer"
					target="_blank"
					rel="noreferrer"
				>
					<div className="badge">
						<Image src={buildspaceLogo} alt="buildspace logo" />
						<p>build with buildspace</p>
					</div>
				</a>
			</div>
		</div>
	);
};

export default Home;