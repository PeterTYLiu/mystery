import "./App.css";
import React, { useState } from "react";
import { generateGame } from "./utils/generateGame";

const people = [
  "Hugo",
  "Peter",
  "Denizhan",
  "Ryan",
  "Sonny",
  "Aarjan",
  "Zarif",
  "Jawad",
  "Ty",
];
const items = [
  // Must have more people than items, otherwise game crashes
  "Monopod",
  "Projector",
  "Camera",
  "Tripod",
  "#60",
  "Extension cord",
];
const locations = [
  "Bubble Tease",
  "MC",
  "Waterloo Star",
  "Mel's Diner",
  "Princess Cinemas",
];
const phrases = [
  "I'm innocent, I swear!",
  "It couldn't have been me!",
  "I didn't do it!",
  "What are you asking me for??",
  "My hands are clean!",
  "Go point your nose somewhere else!",
  "I'm totally innocent!",
  "I have nothing to hide!",
  "Why would I do it?",
  "So young, so tragic...",
  "Murder?? Oh dear...",
  "I hope you find the perp!",
  "Wasn't me, honest-to-God!",
  "My alibi is solid!",
  "Me? A murderer? Surely not!",
];

const victim = "Ryan";
const killer = "Denizhan";
const crimeScene = "Mel's Diner";
const weapon = "Monopod";

function App() {
  const [guess, setGuess] = useState({
    murderer: people[1],
    weapon: items[0],
    crimeScene: locations[0],
  });
  const [guessesLeft, setGuessesLeft] = useState(3);
  return (
    <div className="App">
      <div id="container" style={{ padding: "1rem 1.5rem" }}>
        <section id="interrogate">
          <button
            onClick={() =>
              console.log(
                generateGame(
                  people,
                  items,
                  locations,
                  victim,
                  weapon,
                  crimeScene,
                  killer
                )
              )
            }
          >
            Generate
          </button>
          <h1>Select someone to interrogate</h1>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1em",
              justifyContent: "space-evenly",
            }}
          >
            {people
              .filter((person) => person != victim)
              .map((person) => {
                return (
                  <div
                    className="person"
                    key={person}
                    title={person}
                    role="button"
                    tabIndex={0}
                    style={{
                      background: `url('/images/${person.toLowerCase()}.png')`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      height: "80px",
                      width: "80px",
                      borderRadius: "99px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  ></div>
                );
              })}
          </div>
        </section>
        <hr />
        <section id="guess">
          <h1>Make a guess</h1>
          <p>
            Guesses left: <strong>{guessesLeft}</strong>
          </p>
          <div>
            <label htmlFor="suspect">Murderer: </label>
            <select
              value={guess.murderer}
              id="suspect"
              onChange={(e) => setGuess({ ...guess, murderer: e.target.value })}
            >
              {people
                .filter((person) => person != victim)
                .map((person) => {
                  return (
                    <option value={person} key={person}>
                      {person}
                    </option>
                  );
                })}
            </select>
          </div>
          <div>
            <label htmlFor="weapon">Weapon: </label>
            <select
              value={guess.weapon}
              id="weapon"
              onChange={(e) => setGuess({ ...guess, weapon: e.target.value })}
            >
              {items.map((item) => {
                return (
                  <option value={item} key={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="location">Location: </label>
            <select
              id="location"
              value={guess.crimeScene}
              onChange={(e) =>
                setGuess({ ...guess, crimeScene: e.target.value })
              }
            >
              {locations.map((location) => {
                return (
                  <option value={location} key={location}>
                    {location}
                  </option>
                );
              })}
            </select>
          </div>
        </section>
        <button>J'accuse!</button>
      </div>
    </div>
  );
}

export default App;
