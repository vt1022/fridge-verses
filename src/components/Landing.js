import React, { Component } from 'react'
import Search from './Search.js'
import imgPath from '../assets/illustrations--landing.png'


class Landing extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return(
            <>
                <div className="app__container__leftLanding">
                    <h1 className="main-header">Recreate the IRL fun of magnetic poetry</h1>
                    <div className="container__form">
                        <Search changePage={this.props.changePage}
                        setGeneratedWords={this.props.setGeneratedWords}/>
                        <p className="main-paragraph">Give us your own prompt to kick things off or let us generate a word for you.</p>
                    </div>
                </div>
                <div className="app__container__rightLanding">
                    <img src={imgPath} alt="illustration of a person moving one post-it from a board of 18 other post-its"/>
                </div>
            </>
        )
    }
}

export default Landing