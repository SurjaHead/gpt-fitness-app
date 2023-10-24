import Head from "next/head";
import Image from "next/image";
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
    console.log(data);

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
            <h1>Get a personalized workout plan.</h1>
          </div>
          <div className="header-subtitle">
            <h2>
              Give us your information and preferences below and we'll generate
              the perfect workout plan for you. Give your information in the
              following format:
            </h2>
            <h2>Height (in):</h2>
            <h2>Weight (lbs):</h2>
            <h2>
              Goals (lose x amount of fat, gain x amount of muscle, etc.):{" "}
            </h2>
            <h2>Availability (days per week and minutes per day):</h2>
            <h2>
              Access to equipment (cardio only, free weights only, everything,
              etc.):{" "}
            </h2>
            <h2>
              Preferred form of exercise (weightlifiting, cardio, calisthenics,
              etc.):
            </h2>
            {/* <h2>Height:</h2>
            <h2>Weight:</h2>
            <h2>Activity level:</h2>
            <h2>Availability:</h2>
            <h2>Access to equipment:</h2>
            <h2>Diet restrictions:</h2>
            <h2>Disliked foods:</h2>
            <h2>Goals:</h2> */}
          </div>
        </div>

        <div className="prompt-container">
          <textarea
            placeholder={`For example:

Height: 6 feet
Weight: 180 lbs
Goal: lose 10lbs of fat
Availability: 5 times a week, 1 hour per workout
Access to equipment: everything
Preferred form of exercise: weightlifting`}
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
            <a
              className={
                isGenerating ? "generate-button loading" : "generate-button"
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
                <p dangerouslySetInnerHTML={{ __html: apiOutput }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
