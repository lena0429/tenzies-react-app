import React, { useState } from 'react';
import './style.css';
import Die from './components/Die';


function App() {
  const [ dice, setDice ] = useState(allNewDice())

  console.log(dice)

  function allNewDice(){
    let arr = [];

    for (let i = 0; i < 10; i++){
      arr.push(Math.ceil(Math.random() * 6))
    }
    return arr;
  }

  const diceArray = dice.map((num, idx) => <Die value={num} />) 

  return (
    <main>
      <div className="dice-container">
          {diceArray}
      </div>
    </main>
  );
}

export default App;
