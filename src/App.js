import React, { Component } from 'react';
import Landing from './components/Landing.js';
import Backend from 'react-dnd-html5-backend'
import GameBoard from './components/GameBoard'
import Gallery from './components/Gallery.js';
import GameContainer from './components/GameContainer'
import MagnetBoard from './components/MagnetBoard.js'
import DraggableBoard from './components/DraggableBoard.js'
import DndGrid from './components/DndGrid.js'

import { DndProvider } from 'react-dnd'
import firebase from './firebase.js';
import './styles/styles.scss';

class App extends Component {
    constructor() {
        super()
        this.state = {
        currentPage : 'landing',
        generatedWords: [] ,
        // push each word into poem array when dragged into staging area
        poem : []
        }
    }

    componentDidMount() {
        // firebase stuff and poemSubmit will probably be moved to a gallery component later?
        // firebase:
        const dbRef = firebase.database().ref();
        dbRef.on('value', (result) => {
            const data = result.val()
            console.log(data)
        })
        // firebase ---
    }

    setGeneratedWords = (generatedWords) => {
        this.setState({
            generatedWords: generatedWords
        })
    }

    changePage = (targetPage) => this.setState({currentPage: targetPage})

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
        const {currentPage} = this.state
        return (
            <div className="app wrapper">
                <nav className="app__nav">
                    <ul>
                        <li className="nav__branding"
                            onClick={() => this.changePage('landing')}
                        >
                            Project Name
                        </li>
                        {/* testing purpose: */}
                        <li className="nav__link"
                            onClick={() => this.changePage('gameBoard')}
                        >
                            beautifulBoard
                        </li>
                        <li className="nav__link"
                            onClick={() => this.changePage('dndGrid')}
                        >
                            beautifulGridBoard
                        </li>
                        <li className="nav__link" 
                            onClick={() => this.changePage('gallery')}
                        >
                            Gallery
                        </li>
                    </ul>
                </nav>
                <div className="app__container">
                    {
                        currentPage === 'landing' &&
                            <Landing /> 
                        || 
                        currentPage === 'gameBoard' &&
                            <GameBoard />
                        || 
                        currentPage === 'dndGrid' &&
                            <DndGrid />
                        || 
                        currentPage === 'gallery' &&
                            <Gallery changePage={this.changePage}/>
                    }
                {/* THIS IS THE GAME BOARD FOR TESTING, IM NOT SURE WHERE TO PUT IT */}
                    {/* <section>
                        <DndProvider backend={Backend}>
                        <GameContainer />
                        </DndProvider>
                    </section> */}
                </div>
                <footer className="app__footer">
                    <div>

                    </div>
                </footer>
            </div>
        );
    }
}

export default App;
