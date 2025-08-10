"use client";

import { useEffect, useState } from "react";
import "./globals.css";

const prompts = [
    "The quick brown fox jumps over the lazy dog.",
    "Never underestimate the power of a good book.",
    "The journey of a thousand miles begins with a single step.",
    "Technology has revolutionized the way we live and work.",
    "To be or not to be, that is the question.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts."
];

export default function Home() {
    const [currentPrompt, setCurrentPrompt] = useState<string>("");
    const [typedChars, setTypedChars] = useState<string[]>([]);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [errors, setErrors] = useState<number>(0);
    const [time, setTime] = useState<number>(0);
    const [wpm, setWpm] = useState<number>(0);
    const [accuracy, setAccuracy] = useState<number>(0);
    const [testActive, setTestActive] = useState<boolean>(false);
    const [pressedKey, setPressedKey] = useState<string | null>(null);

    const loadNewPrompt = () => {
        setTestActive(false);
        setTypedChars([]);
        setErrors(0);
        setStartTime(null);
        setTime(0);
        setWpm(0);
        setAccuracy(0);
        const randomIndex = Math.floor(Math.random() * prompts.length);
        setCurrentPrompt(prompts[randomIndex]);
    };

    const calculateResults = () => {
        setTestActive(false);
        if (startTime) {
            const endTime = new Date();
            const timeTakenInSeconds = (endTime.getTime() - startTime.getTime()) / 1000;
            const correctChars = typedChars.filter((char, index) => char === currentPrompt[index]).length;
            const calculatedWpm = Math.round((correctChars / 5) / (timeTakenInSeconds / 60));
            const calculatedAccuracy = Math.round((correctChars / currentPrompt.length) * 100);

            setTime(Math.round(timeTakenInSeconds));
            setWpm(calculatedWpm);
            setAccuracy(calculatedAccuracy);
        }
    };

    useEffect(() => {
        loadNewPrompt();
    }, []);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key;
            setPressedKey(key.toLowerCase());

            if (key === "Enter") {
                loadNewPrompt();
                return;
            }

            if (!testActive && key.length === 1 && key !== "Backspace") {
                setTestActive(true);
                setStartTime(new Date());
            }

            if (testActive) {
                if (key === "Backspace") {
                    setTypedChars(prev => prev.slice(0, -1));
                } else if (key.length === 1) {
                    if (typedChars.length < currentPrompt.length) {
                        setTypedChars(prev => [...prev, key]);
                    }
                }
            }
        };

        const handleKeyUp = () => {
            setPressedKey(null);
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [testActive, typedChars.length, currentPrompt]);

    useEffect(() => {
        if (testActive) {
            if (typedChars.length === currentPrompt.length) {
                calculateResults();
            }
            let charErrors = 0;
            for (let i = 0; i < typedChars.length; i++) {
                if (typedChars[i] !== currentPrompt[i]) {
                    charErrors++;
                }
            }
            setErrors(charErrors);
        }
    }, [typedChars, currentPrompt, testActive, startTime]);

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (testActive && startTime) {
            intervalId = setInterval(() => {
                const seconds = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
                setTime(seconds);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [testActive, startTime]);

    const renderPrompt = () => {
        return currentPrompt.split("").map((char, index) => {
            let className = "";
            if (index < typedChars.length) {
                className = typedChars[index] === char ? "correct" : "incorrect";
            } else if (index === typedChars.length) {
                className = "current";
            }
            return (
                <span key={index} className={className}>
                    {char}
                </span>
            );
        });
    };

    return (
        <div className="container">
            <h1 className="cyber-heading">Cyber Typing Trainer</h1>

            <div className="screen">
                <p id="promptDisplay">{renderPrompt()}</p>
            </div>

            <div className="keyboard">
                <div className="row">
                    <div className={`key ${pressedKey === "q" ? "pressed" : ""}`} data-key="q">Q</div>
                    <div className={`key ${pressedKey === "w" ? "pressed" : ""}`} data-key="w">W</div>
                    <div className={`key ${pressedKey === "e" ? "pressed" : ""}`} data-key="e">E</div>
                    <div className={`key ${pressedKey === "r" ? "pressed" : ""}`} data-key="r">R</div>
                    <div className={`key ${pressedKey === "t" ? "pressed" : ""}`} data-key="t">T</div>
                    <div className={`key ${pressedKey === "y" ? "pressed" : ""}`} data-key="y">Y</div>
                    <div className={`key ${pressedKey === "u" ? "pressed" : ""}`} data-key="u">U</div>
                    <div className={`key ${pressedKey === "i" ? "pressed" : ""}`} data-key="i">I</div>
                    <div className={`key ${pressedKey === "o" ? "pressed" : ""}`} data-key="o">O</div>
                    <div className={`key ${pressedKey === "p" ? "pressed" : ""}`} data-key="p">P</div>
                </div>
                <div className="row">
                    <div className={`key ${pressedKey === "a" ? "pressed" : ""}`} data-key="a">A</div>
                    <div className={`key ${pressedKey === "s" ? "pressed" : ""}`} data-key="s">S</div>
                    <div className={`key ${pressedKey === "d" ? "pressed" : ""}`} data-key="d">D</div>
                    <div className={`key ${pressedKey === "f" ? "pressed" : ""}`} data-key="f">F</div>
                    <div className={`key ${pressedKey === "g" ? "pressed" : ""}`} data-key="g">G</div>
                    <div className={`key ${pressedKey === "h" ? "pressed" : ""}`} data-key="h">H</div>
                    <div className={`key ${pressedKey === "j" ? "pressed" : ""}`} data-key="j">J</div>
                    <div className={`key ${pressedKey === "k" ? "pressed" : ""}`} data-key="k">K</div>
                    <div className={`key ${pressedKey === "l" ? "pressed" : ""}`} data-key="l">L</div>
                </div>
                <div className="row">
                    <div className={`key ${pressedKey === "z" ? "pressed" : ""}`} data-key="z">Z</div>
                    <div className={`key ${pressedKey === "x" ? "pressed" : ""}`} data-key="x">X</div>
                    <div className={`key ${pressedKey === "c" ? "pressed" : ""}`} data-key="c">C</div>
                    <div className={`key ${pressedKey === "v" ? "pressed" : ""}`} data-key="v">V</div>
                    <div className={`key ${pressedKey === "b" ? "pressed" : ""}`} data-key="b">B</div>
                    <div className={`key ${pressedKey === "n" ? "pressed" : ""}`} data-key="n">N</div>
                    <div className={`key ${pressedKey === "m" ? "pressed" : ""}`} data-key="m">M</div>
                </div>
                <div className="row">
                    <div className={`key wide ${pressedKey === " " ? "pressed" : ""}`} data-key=" ">Space</div>
                    <div className={`key wide ${pressedKey === "enter" ? "pressed" : ""}`} data-key="Enter">New Test</div>
                </div>
            </div>

            <div className="results">
                <p><b>Time: </b><span>{time}</span>s</p>
                <p><b>WPM: </b><span>{wpm}</span></p>
                <p><b>Accuracy: </b><span>{accuracy}</span>%</p>
            </div>

            <div className="instructions">
                <p>Press 'Enter' to start a new test.</p>
            </div>
        </div>
    );
}
