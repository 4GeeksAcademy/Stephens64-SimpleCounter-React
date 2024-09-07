import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

// Include your styles into the webpack bundle
import "../styles/index.css";

// Import both FontAwesomeIcon and the icon from icons.js
import { FontAwesomeIcon, faClock } from "./icons.js";

function SimpleCounter(props) {
    return (
        <div className="bigCounter">
            <div className="clockIcon">
                <FontAwesomeIcon icon={faClock} />
            </div>
            <div className="digitSix">{props.digitSix}</div>
            <div className="digitFive">{props.digitFive}</div>
            <div className="digitFour">{props.digitFour}</div>
            <div className="digitThree">{props.digitThree}</div>
            <div className="digitTwo">{props.digitTwo}</div>
            <div className="digitOne">{props.digitOne}</div>
        </div>
    );
}

function App() {
    const [counter, setCounter] = useState(0);
    const [inputValue, setInputValue] = useState(0);
    const [isCountingDown, setIsCountingDown] = useState(false);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        let intervalId;

        if (isRunning) {
            if (isCountingDown) {
                if (counter > 0) {
                    intervalId = setInterval(() => {
                        setCounter((prevCounter) => prevCounter - 1);
                    }, 1000);
                } else {
                    setIsCountingDown(false);
                }
            } else {
                intervalId = setInterval(() => {
                    setCounter((prevCounter) => prevCounter + 1);
                }, 1000);
            }
        }

        return () => clearInterval(intervalId);
    }, [isRunning, isCountingDown, counter]);

    const digitOne = Math.floor(counter % 10);
    const digitTwo = Math.floor((counter / 10) % 10);
    const digitThree = Math.floor((counter / 100) % 10);
    const digitFour = Math.floor((counter / 1000) % 10);
    const digitFive = Math.floor((counter / 10000) % 10);
    const digitSix = Math.floor((counter / 100000) % 10);

    const handleInputChange = (event) => {
        setInputValue(Number(event.target.value));
    };

    const startCountdown = () => {
        setCounter(inputValue);
        setIsCountingDown(true);
        setIsRunning(true);
    };

    const stopCounter = () => {
        setIsRunning(false);
    };

    const resetCounter = () => {
        if (isCountingDown) {
            setCounter(inputValue);
        } else {
            setCounter(0);
        }
        setIsRunning(false);
    };

    const resumeCounter = () => {
        setIsRunning(true);
    };

    return (
        <div>
            <SimpleCounter
                digitOne={digitOne}
                digitTwo={digitTwo}
                digitThree={digitThree}
                digitFour={digitFour}
                digitFive={digitFive}
                digitSix={digitSix}
            />

            <div className="controlButtons">
                <button onClick={stopCounter}>Stop</button>
                <button onClick={resetCounter}>Reset</button>
                <button onClick={resumeCounter}>Resume</button>
            </div>

             <div className="inputContainer">
                <input
                    type="number"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button onClick={startCountdown}>Start Countdown</button>
            </div>

            <h1>{isCountingDown ? "Countdown Mode" : "Second Counter Mode"}</h1>
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
