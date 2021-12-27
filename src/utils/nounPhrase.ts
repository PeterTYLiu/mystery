export default function nounPhrase(nouns: string[]) {
  if (nouns.length === 0) return "";
  if (nouns.length === 1) return nouns[0];
  if (nouns.length === 2) return `${nouns[0]} and ${nouns[1]}`;
  let substrings = nouns.slice(0, nouns.length - 1).map((noun) => `${noun}, `);
  substrings.push(`and ${nouns[nouns.length - 1]}`);
  return substrings.join("");
}
