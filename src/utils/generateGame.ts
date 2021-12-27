import { suspect } from "../types/suspect";

export const generateGame = (
  people: string[],
  items: string[],
  locations: string[],
  presetVictim?: string,
  presetWeapon?: string,
  presetCrimeScene?: string,
  presetKiller?: string
) => {
  let killer =
    presetKiller || people[Math.floor(Math.random() * people.length)];
  let victim =
    presetVictim ||
    people.filter((person) => person !== killer)[
      Math.floor(Math.random() * (people.length - 1))
    ];
  let weapon = presetWeapon || items[Math.floor(Math.random() * items.length)];
  let crimeScene =
    presetCrimeScene || locations[Math.floor(Math.random() * locations.length)];

  let innocentItems = items.filter((item) => item !== weapon);
  let innocentLocations = locations.filter(
    (location) => location !== crimeScene
  );

  // Create suspects and killer
  let suspects: suspect[] = [];
  people.forEach((personInList) => {
    if (personInList != victim) {
      let suspect: suspect = {
        name: personInList,
        item: "",
        location: "",
        guilty: false,
        suspicion: "",
        talkative: true,
      };
      if (personInList == killer) {
        suspect.item = weapon;
        suspect.location = crimeScene;
        suspect.guilty = true;
      } else {
        suspect.location =
          innocentLocations[
            Math.floor(Math.random() * innocentLocations.length)
          ];
      }
      suspects.push(suspect);
    }
  });

  // Assign suspicions to each person
  suspects.forEach((suspect, index) => {
    let suspectsInOtherPlaces = suspects.filter(
      (innerSuspect) => innerSuspect.location !== suspect.location
    );

    suspects[index].suspicion =
      suspectsInOtherPlaces[
        Math.floor(Math.random() * suspectsInOtherPlaces.length)
      ].name;
  });

  // Assign items to innocent people
  innocentItems.forEach((item) => {
    let suspectIndex = Math.floor(Math.random() * suspects.length);
    while (suspects[suspectIndex].item) {
      suspectIndex = Math.floor(Math.random() * suspects.length);
    }
    suspects[suspectIndex].item = item;
  });

  // let statement = `${killer} killed ${victim} at ${crimeScene} with the ${weapon.toLowerCase()}`;

  return suspects;
};
