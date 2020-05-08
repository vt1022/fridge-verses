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
        poem : [],
        generatedWordsTest: [
            {id: '123', order: 0, content: 'a'},
            {id: '124', order: 1, content: 'an'},
            {id: '125', order: 2, content: 'the'},
            {id: '126', order: 3, content: 'that'},
            {id: '127', order: 4, content: 'this'},
            {id: '128', order: 5, content: 'those'},
            {id: '129', order: 6, content: 'these'},
            {id: '120', order: 7, content: 'my'},
            {id: '131', order: 8, content: 'your'},
            {id: '132', order: 9, content: 'their'},
            {id: '133', order: 10, content: 'our'},
            {id: '134', order: 11, content: 'ours'},
            {id: '135', order: 12, content: 'whose'},
            {id: '136', order: 13, content: 'his'},
            {id: '137', order: 14, content: 'hers'},
            {id: '138', order: 15, content: 'its'},
            {id: '139', order: 16, content: 'which'},
            {id: '130', order: 17, content: 'some'},
            {id: '141', order: 18, content: 'both'},
            {id: '142', order: 19, content: 'most'},
            {id: '143', order: 20, content: 'many'},
            {id: '144', order: 21, content: 'a few'},
            {id: '145', order: 22, content: 'a lot of'},
            {id: '146', order: 23, content: 'any'},
            {id: '147', order: 24, content: 'much'},
            {id: '148', order: 25, content: 'a little'},
            {id: '149', order: 26, content: 'enough'},
            {id: '140', order: 27, content: 'several'},
            {id: '151', order: 28, content: 'none'},
        ]
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
                            <DndGrid generatedWordsTest={this.state.generatedWordsTest}/>
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
