import React, { Component } from 'react';
import Landing from './components/Landing.js';
import GameBoard from './components/GameBoard'
import Gallery from './components/Gallery.js';

import './styles/styles.scss';
/******** set poem max length at GameBoard.js ln 75 ********/
class App extends Component {
    constructor() {
        super()
        this.state = {
        currentPage : 'landing',
        generatedWords: [],
        functionalWords: []
        }
    }
    //Make sure no words have the same ID
    getUniqueWords = (words) => {
        let uniqueWords = []

        for (let i = 0; i < words.length; i++) {
            let keyExists = false;
            let word = words[i];

            for(let j = 0; j < uniqueWords.length; j++) {
                if (word.id == uniqueWords[j].id) {
                    keyExists = true;
                }
            }
            if (!keyExists) {
                uniqueWords.push(word);
            }
        }

        return uniqueWords
    }

    enableAllWords = () => {
        // Set "disabled" to false for all generated word
        let generatedWords = this.state.generatedWords.map(word => {
            word.disabled = false;
            return word;
        })

        this.setState({
            generatedWords: generatedWords
        })
    }

    disableWord = (id) => {
        // Given the ID of a word, disable only that word        
        let generatedWords = this.state.generatedWords.map(word => {

            if(word.id === id) {
                word.disabled = true;
            }

            return word;
        })

        this.setState({
            generatedWords: generatedWords
        })
    }
    //Words generated based on query saved to state 
    setGeneratedWords = (generatedWords) => {

        generatedWords = generatedWords.filter(word => word.content.indexOf(' ') === -1)

        let uniqueWords = this.getUniqueWords(generatedWords);

        this.setState({
            generatedWords: uniqueWords
        })
    }

    //Functional words generated based on query saved to state
    setFunctionalWords = (functionalWords) => {

        functionalWords =functionalWords.filter(word => word.content.indexOf(' ') === -1)

        let uniqueWords = this.getUniqueWords(functionalWords);

        this.setState({
            functionalWords: uniqueWords
        })
    }

    changePage = (targetPage) => this.setState({currentPage: targetPage})

    render() {
        const { currentPage, generatedWords, functionalWords } = this.state
        return (
            <div className="app wrapper">
                <nav className="app__nav">
                    <ul>
                        <li className="nav__branding"
                        onClick={() => this.changePage('landing')}>
                            Fridge Verses
                        </li>
                        {/* testing purpose: */}
                        <li className="nav__link"
                        onClick={() => this.changePage('gameBoard')}>
                            game test
                        </li>
                        <li className="nav__link" 
                        onClick={() => this.changePage('gallery')}>
                            Gallery
                        </li>
                    </ul>
                </nav>
                <div className="app__container">
                    {currentPage === 'landing' &&
                        <Landing changePage={this.changePage} 
                        setGeneratedWords={this.setGeneratedWords} setFunctionalWords={this.setFunctionalWords} /> }
                    {currentPage === 'gameBoard' &&
                        <GameBoard changePage={this.changePage}
                        generatedWords={generatedWords} functionalWords={functionalWords}
                        enableAllWords={this.enableAllWords}
                        disableWord={this.disableWord}
                        />}
                    {currentPage === 'gallery' &&
                        <Gallery changePage={this.changePage} />}
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
