import React, { Component } from 'react';
import Landing from './components/Landing.js';
import GameBoard from './components/GameBoard'
import Gallery from './components/Gallery.js';

import './styles/styles.scss';

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
        const {currentPage} = this.state
        return (
            <div className="app wrapper">
                <nav className="app__nav">
                    <ul>
                        <li className="nav__branding"
                            onClick={() => this.changePage('landing')}
                        >
                            Fridge Verses
                        </li>
                        {/* testing purpose: */}
                        <li className="nav__link"
                            onClick={() => this.changePage('gameBoard')}
                        >
                            game test
                        </li>
                        <li className="nav__link" 
                            onClick={() => this.changePage('gallery')}
                        >
                            Gallery
                        </li>
                    </ul>
                </nav>
                <div className="app__container">
                    {currentPage === 'landing' &&
                        <Landing setGeneratedWords={this.setGeneratedWords} /> 
                    }
                    {currentPage === 'gameBoard' &&
                        <GameBoard generatedWords={this.state.generatedWords} />
                    }
                    {currentPage === 'gallery' &&
                        <Gallery changePage={this.changePage} />
                    }
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
