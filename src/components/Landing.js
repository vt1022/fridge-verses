import React, { Component } from 'react'
import Search from './Search.js'
import imgPath from '../assets/illustrations--landing.png'
import '../styles/landing.scss'

class Landing extends Component {
    render() {
        const { changePage, setGeneratedWords, setFunctionalWords } = this.props
        return(
            <>
                <div className="landing__illustration">
                    <img src={imgPath} className="illustration__img" alt="illustration of a person moving one post-it from a board of 18 other post-its"/>
                </div>
                <div className="landing__opt-in">
                    <h1 className="main-header">Recreate the IRL fun of magnetic poetry</h1>
                    <div className="opt-in__form">
                        <p className="main-paragraph">Give us your own prompt to kick things off or let us generate a word for you.</p>
                        <Search changePage={changePage}
                            setGeneratedWords={setGeneratedWords} setFunctionalWords={setFunctionalWords}/>
                    </div>
                </div>
            </>
        )
    }
}

export default Landing