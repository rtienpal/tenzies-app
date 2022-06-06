import React from "react";
import Die from "./components/Die";

export default function App() {
  const [diceNumbers, setDiceNumbers] = React.useState(allNewDice());

  function allNewDice() {
    const randomDieNumbersArray = [];
    for (let i = 0; i < 10; i++) {
      randomDieNumbersArray[i] = Math.floor(Math.random() * 7);
    }
    return randomDieNumbersArray;
  }

  function rollDice() {
    setDiceNumbers(allNewDice);
  }

  const die = diceNumbers.map((number) => <Die number={number}></Die>);
  return (
    <main>
      <div className="dice-container">{die}</div>
      <button className="roll-button" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}
