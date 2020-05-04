import React, { Component } from 'react';
import './App.css';
import Board from './components/Board';
import Magnet from './components/Magnets';

class App extends Component {
  render() {
  return (
    <div className="App">

      <main className="flexbox">
        {/* here will be our boards */}
        <Board id="board-1" className="board">
         <Magnet id="magnet-1" className="magnet" draggable="true">
           <p>Cat</p>
         </Magnet>
          <Magnet id="magnet-2" className="magnet" draggable="true">
            <p>Dog</p>
          </Magnet>
          <Magnet id="magnet-3" className="magnet" draggable="true">
            <p>Bird</p>
          </Magnet>
        </Board>

        <Board id="board2" className="board">
          
        </Board>
      </main>

    </div>
  );
  }
}

export default App;
