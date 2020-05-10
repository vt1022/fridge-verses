import React, { Component } from 'react';
import Landing from './components/Landing.js';
import GameBoard from './components/GameBoard'
import Gallery from './components/Gallery.js';

import './styles/styles.scss';

// Prevents Auto-Zoom Behaviour with Forms on Mobile
const viewportMeta = document.querySelector('meta[name="viewport"]');
viewportMeta.content = 'user-scalable=NO, width=device-width, initial-scale=1.0';

/******** set poem max length at GameBoard.js ln 72 ********/
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
            !keyExists && uniqueWords.push(word)
        }
        return uniqueWords
    }

    enableAllWords = () => { 
        // Set "disabled" to false for all generated word
        let generatedWords = this.state.generatedWords.map(word => {
            word.disabled = false;
            return word;
        })
        this.setState({ generatedWords: generatedWords })
    }

    disableWord = (id) => {
        // Given the ID of a word, disable only that word        
        let generatedWords = this.state.generatedWords.map(word => {
            if(word.id === id) {
                word.disabled = true;
            }
            return word;
        })
        this.setState({ generatedWords: generatedWords })
    }
    //Words generated based on query saved to state 
    setGeneratedWords = (generatedWords) => {
        generatedWords = generatedWords.filter(word => word.content.indexOf(' ') === -1)

        let uniqueWords = this.getUniqueWords(generatedWords);
        this.setState({ generatedWords: uniqueWords })
    }
    //Functional words generated based on query saved to state
    setFunctionalWords = (functionalWords) => {
        functionalWords = functionalWords.filter(word => word.content.indexOf(' ') === -1)

        let uniqueWords = this.getUniqueWords(functionalWords);
        this.setState({ functionalWords: uniqueWords })
    }

    changePage = (targetPage) => this.setState({ currentPage: targetPage })

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
                        <li className="nav__link nav__link--desktop" 
                        onClick={() => this.changePage('gallery')}>
                            Gallery
                        </li>

                        <li className="nav__link nav__link--mobile">

                            <input type="checkbox" id="menu-trigger"/>

                            <label className="hamburger" for="menu-trigger">
                                <div className="hamburger__line hamburger__line--top"></div>
                                <div className="hamburger__line hamburger__line--bottom"></div>
                            </label>

                            <div className="nav__mobile">
                                <ul className="mobile__links">
                                    <li>Gallery</li>
                                </ul>
                            </div>

                        </li>

                    </ul>
                </nav>
                <main className="app__container">
                    { // && basically shorthand if statement
                    currentPage === 'landing' &&
                        <Landing changePage={this.changePage} 
                        setGeneratedWords={this.setGeneratedWords} 
                        setFunctionalWords={this.setFunctionalWords} />
                    }
                    {
                    currentPage === 'gameBoard' &&
                        <GameBoard changePage={this.changePage}
                        generatedWords={generatedWords} functionalWords={functionalWords} enableAllWords={this.enableAllWords}
                        disableWord={this.disableWord}/>}
                    {currentPage === 'gallery' &&
                        <Gallery changePage={this.changePage} />}
                </main>
                <footer className="app__footer">
                    <div className="footer__social">
                        <i class="fab fa-github"></i>
                    </div>
                </footer>
            </div>
        );
    }
}

export default App;
