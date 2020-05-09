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
        generatedWords: [] 
        }
    }

    setGeneratedWords = (generatedWords) => {
        this.setState({
            generatedWords: generatedWords
        })
    }

    changePage = (targetPage) => this.setState({currentPage: targetPage})

    render() {
        const { currentPage, generatedWords } = this.state
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
                        setGeneratedWords={this.setGeneratedWords} /> }
                    {currentPage === 'gameBoard' &&
                        <GameBoard changePage={this.changePage}
                        generatedWords={generatedWords} />}
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
