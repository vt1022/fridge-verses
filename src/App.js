import React, { Component } from 'react';
import firebase from './firebase.js';
import './App.css';
import Board from './components/Board';
import Magnet from './components/Magnets';

class App extends Component {
  constructor() {
    super()
    this.state = {
      // push each word into poem array when dragged into staging area
      poem : []
    }
  }

  componentDidMount() {
    // firebase:
    const dbRef = firebase.database().ref();
    dbRef.on('value', (result) => {
      const data = result.val()
      console.log(data)
    })
    // firebase ---
  }


  poemSubmit = () => {
    const {poem} = this.state // destructuring state for clean code
    const maxWordsInPoem = 10 // placeholder number for now
    if (poem.length <= maxWordsInPoem && poem.length > 2) {
      const dbRef = firebase.database().ref()
      dbRef.push(poem)
      this.setState({poem: []})
    // error handling:
    } else if (poem.length < 3) {
      alert('You need more than 2 words in your poem.')
    } else if (poem.length > maxWordsInPoem ) {
      alert(`Your poem is too long! Nothing longer than ${maxWordsInPoem} please.`)
    }
  }

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
