import React, { useState } from 'react';
import './style.css';
import Die from './components/Die';
import {nanoid} from "nanoid";

function App() {
  const [ dice, setDice ] = useState(allNewDice())


   // helper function to dry code
   function generateNewDie(){
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }


  // generate an array of new dice when clicking the roll button
  function allNewDice(){
    let arr = [];

    for (let i = 0; i < 10; i++){
      arr.push(generateNewDie())
    }
    return arr;
  }
  
  function holdDice(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const diceArray = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />) 

  function rollDice(){
    setDice(prevDice => prevDice.map(die => {
      return die.isHeld ? 
             die : generateNewDie()
    }))
  }

  return (
    <main>
      <div className="dice-container">
          {diceArray}
      </div>
      <button className="roll-button" onClick={rollDice}>Roll</button>
    </main>
  );
}

export default App;
