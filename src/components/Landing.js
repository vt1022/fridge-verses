import React, { Component } from 'react'
import Search from './Search.js'

class Landing extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    render() {
        return(
            <section className="landing">
                <div className="leftLanding">
                    <h1>Recreate the IRL fun of magnetic poetry</h1>
                    <Search />
                    <p>Give us your own promt to kick things off or let us generate a word for you.</p>
                </div>
                <div className="rightLanding">
                    <img src="./assets/illustrations--landing.png" alt="illustration of a person moving one post-it from a board of 18 other post-its"/>
                </div>
            </section>
        )
    }
}

export default Landing