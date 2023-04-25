import "./App.css";
import React, { useState } from "react";
import { generateGame } from "./utils/generateGame";
import nounPhrase from "./utils/nounPhrase";
import { suspect } from "./types/suspect";
import Instructions from "./components/Instructions";

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
const susPhrases = [
  "I wonder what he was up to...",
  "Pretty fishy, if you ask me...",
  "I don't trust that character...",
  "Maybe you should look into that...",
  "He's a pretty shady dude",
  "I feel like he's hiding something...",
];

// Variables
const victim = "Ryan";
const killer = "Denizhan";
const crimeScene = "Mel's Diner";
const weapon = "Monopod";
const suspects = [
  {
    name: "Hugo",
    item: "Tripod",
    location: "Bubble Tease",
    guilty: false,
    suspicion: "Ty",
    talkative: true,
  },
  {
    name: "Peter",
    item: "",
    location: "Bubble Tease",
    guilty: false,
    suspicion: "Jawad",
    talkative: false,
  },
  {
    name: "Denizhan",
    item: "Monopod",
    location: "Mel's Diner",
    guilty: true,
    suspicion: "Zarif",
    talkative: true,
  },
  {
    name: "Sonny",
    item: "#60",
    location: "Waterloo Star",
    guilty: false,
    suspicion: "Hugo",
    talkative: false,
  },
  {
    name: "Aarjan",
    item: "",
    location: "Bubble Tease",
    guilty: false,
    suspicion: "Sonny",
    talkative: false,
  },
  {
    name: "Zarif",
    item: "Extension cord",
    location: "Princess Cinemas",
    guilty: false,
    suspicion: "Peter",
    talkative: true,
  },
  {
    name: "Jawad",
    item: "Projector",
    location: "MC",
    guilty: false,
    suspicion: "Zarif",
    talkative: true,
  },
  {
    name: "Ty",
    item: "Camera",
    location: "MC",
    guilty: false,
    suspicion: "Aarjan",
    talkative: false,
  },
];

const interrogate = (suspect: suspect) => {
  const withMe = suspects
    .filter(
      (innerSuspect) =>
        innerSuspect.location == suspect.location &&
        innerSuspect.name !== suspect.name
    )
    .map((innerSuspect) => innerSuspect.name);

  if (suspect.talkative) {
    alert(`${suspect.name} says:

  ${phrases[Math.floor(Math.random() * phrases.length)]}

  That night, I was at ${suspect.guilty ? locations[2] : suspect.location}${
      suspect.item && !suspect.guilty
        ? ` with the ${suspect.item.toLowerCase()}`
        : ""
    }.${
      withMe.length
        ? ` Plus, ${nounPhrase(withMe)} ${
            withMe.length > 1 ? "were" : "was"
          } with me!`
        : ""
    }

  I did see ${suspect.suspicion} going off to ${
      suspects.find((innerSuspect) => innerSuspect.name == suspect.suspicion)
        ?.location
    }${
      suspect.guilty
        ? " with the " + suspect.item.toLowerCase()
        : suspects.find(
            (innerSuspect) => innerSuspect.name == suspect.suspicion
          )?.item
        ? " with the " +
          suspects
            .find((innerSuspect) => innerSuspect.name == suspect.suspicion)
            ?.item.toLowerCase()
        : ""
    } though... ${susPhrases[Math.floor(Math.random() * susPhrases.length)]}

  `);
  } else {
    alert(`${suspect.name} says:

  ${phrases[Math.floor(Math.random() * phrases.length)]}

  I don't have to tell you anything! I have rights!

  I did see ${suspect.suspicion} going off to ${
      suspects.find((innerSuspect) => innerSuspect.name == suspect.suspicion)
        ?.location
    } though... ${susPhrases[Math.floor(Math.random() * susPhrases.length)]}

  `);
  }
};

function App() {
  const [guess, setGuess] = useState({
    murderer: people[1],
    weapon: items[0],
    crimeScene: locations[0],
  });
  const [guessesLeft, setGuessesLeft] = useState(
    localStorage.getItem("guessesLeft")
      ? Number(localStorage.getItem("guessesLeft"))
      : 5
  );
  const [victory, setVictory] = useState(
    localStorage.getItem("victory")
      ? Number(localStorage.getItem("victory"))
      : 0
  );

  const makeGuess = () => {
    if (guessesLeft > 0) {
      localStorage.setItem("guessesLeft", (guessesLeft - 1).toString());
      setGuessesLeft(guessesLeft - 1);
    }
    if (
      guessesLeft &&
      guess.crimeScene == crimeScene &&
      guess.murderer == killer &&
      guess.weapon == weapon
    ) {
      localStorage.setItem("victory", "1");
      setVictory(1);
      alert(
        `You cracked the case! ${killer} killed ${victim} at ${crimeScene} with the ${weapon.toLowerCase()}!
        
        ${killer} screams as he is taken away by the cops:

        "I would've gotten away with it, if it weren't for you meddling kid!"
        `
      );
    }
    if (
      guessesLeft == 1 &&
      (guess.crimeScene !== crimeScene ||
        guess.murderer !== killer ||
        guess.weapon !== weapon)
    ) {
      alert(
        `Failure! The killer flees into the night, free to continue his reign of terror. Your reputation lies in ruin as the authorities take you away. This is the worst Christmas ever!
        `
      );
    }
    if (
      guessesLeft > 1 &&
      (guess.crimeScene !== crimeScene ||
        guess.murderer !== killer ||
        guess.weapon !== weapon)
    ) {
      alert(
        `Drats - one or more of your conclusions were wrong! You only have ${
          guessesLeft - 1
        } guess${
          guessesLeft > 2 ? "es" : ""
        } left. Maybe ask your friends for help?
        `
      );
    }
  };

  return (
    <div className="App" style={{ display: "grid", placeItems: "center" }}>
      <div id="container" style={{ padding: "1rem 1.5rem", maxWidth: "400px" }}>
        {victory ? (
          <div
            style={{
              padding: "10px",
              background: "darkgreen",
              color: "white",
              textAlign: "center",
            }}
          >
            Congrats! You caught the killer! {killer} killed {victim} at{" "}
            {crimeScene} with the {weapon.toLowerCase()}!
          </div>
        ) : null}
        <section id="interrogate">
          {/* <button
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
          </button> */}
          <h1>Select someone to interrogate</h1>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1em",
              justifyContent: "space-evenly",
            }}
          >
            {suspects.map((suspect) => {
              return (
                <div
                  className="person"
                  key={suspect.name}
                  title={suspect.name}
                  role="button"
                  tabIndex={0}
                  style={{
                    background: `url('./images/${suspect.name.toLowerCase()}.png')`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    height: "80px",
                    width: "80px",
                    borderRadius: "99px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onClick={() => interrogate(suspect)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") alert(interrogate(suspect));
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
        <div style={{ display: "flex", gap: "1.5rem", marginTop: "1rem" }}>
          <button
            id="accuse"
            disabled={guessesLeft === 0 || victory ? true : false}
            onClick={makeGuess}
          >
            J'accuse!
          </button>
          <Instructions victim={victim} />
        </div>
      </div>
    </div>
  );
}

export default App;
