import React, { Component } from 'react';
import Landing from './components/Landing.js';
import GameBoard from './components/GameBoard'
import Gallery from './components/Gallery.js';

import './styles/styles.scss';

// Prevents Auto-Zoom Behaviour with Forms on Mobile
const viewportMeta = document.querySelector('meta[name="viewport"]');
viewportMeta.content = 'user-scalable=NO, width=device-width, initial-scale=1.0';

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

                    {currentPage === 'landing' &&
                        <Landing changePage={this.changePage} 
                        setGeneratedWords={this.setGeneratedWords} /> }
                    {currentPage === 'gameBoard' &&
                        <GameBoard changePage={this.changePage}
                        generatedWords={generatedWords} />}
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
