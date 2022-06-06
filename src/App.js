import React from "react";
import Die from "./components/Die";
import Confetti from "react-confetti";

export default function App() {
  const [diceNumbers, setDiceNumbers] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [rollCount, setRollCount] = React.useState(0);
  const [prevRollCount, setPrevRollCount] = React.useState(0);
  const [rollCountRecord, setRollCountRecord] = React.useState(0);
  console.log(rollCountRecord);

  /*

  React.useEffect(() => {
    localStorage.setItem("rollCountRecord", rollCountRecord);
  }, [rollCountRecord]);
  */

  React.useEffect(() => {
    if (diceNumbers.every((die) => die.fixed)) {
      if (diceNumbers.every((die) => die.value === diceNumbers[0].value)) {
        setTenzies(true);
      }
    }
  }, [diceNumbers]);

  function allNewDice() {
    const randomDieNumbersArray = [];
    for (let i = 0; i < 10; i++) {
      randomDieNumbersArray.push({
        value: Math.floor(Math.random() * 6) + 1,
        id: i + 1,
        fixed: false,
      });
    }
    return randomDieNumbersArray;
  }

  function rollDice() {
    if (tenzies) {
      if (rollCountRecord > rollCount || rollCountRecord === 0) {
        setRollCountRecord(rollCount);
      }
      setPrevRollCount(rollCount);
      setTenzies(false);
      setDiceNumbers(allNewDice());
      setRollCount(0);
    } else {
      setRollCount((prevRoll) => prevRoll + 1);
      setDiceNumbers((prevDice) =>
        prevDice.map((die) => {
          return !die.fixed
            ? { ...die, value: Math.floor(Math.random() * 6) + 1 }
            : die;
        })
      );
    }
  }

  function holdDice(id) {
    setDiceNumbers((prevDice) =>
      prevDice.map((die) => {
        return die.id === id ? { ...die, fixed: !die.fixed } : die;
      })
    );
  }

  const die = diceNumbers.map((die) => (
    <Die
      fixed={die.fixed}
      key={die.id}
      number={die.value}
      holdDice={() => holdDice(die.id)}
    ></Die>
  ));
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{die}</div>
      <button className="roll-button" onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <div className="roll-count">Number of Rolls: {rollCount}</div>
      <div className="prev-roll-count">
        Previous Game: {prevRollCount} rolls
      </div>
      <div className="current-roll-count-record">
        Current Record: {rollCountRecord === 0 ? "-" : rollCountRecord} rolls
      </div>
    </main>
  );
}
