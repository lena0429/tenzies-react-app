import React, { useState } from 'react';
import './style.css';
import Die from './components/Die';
import {nanoid} from "nanoid";
import Confetti from 'react-confetti';

function App() {
  const [ dice, setDice ] = useState(allNewDice())
  // add the tenzies state to inform the user whether they win or not
  const [ tenzies, setTenzies ] = useState(false)

  // we use the side effect to find an winning condition => when all dice are held, we set the tenzies to true
  // keeping two pieces of internal states in sync with each other is a common reason to use useEffect()    
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won!")
    }
  }, [dice])


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

  // this function also handles when we want to start a new game 
  function rollDice(){
    if (!tenzies) {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? 
               die : generateNewDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
    }
  }

  // tells whether win or not
  

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">React Tenzies Game</h1>
      <p className="instructions"> Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
          {diceArray}
      </div>
      <button 
          className="roll-button" 
          onClick={rollDice}

      >
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
