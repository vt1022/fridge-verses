import React, { Component } from 'react';
import axios from 'axios';
import InputAutocomplete from './InputAutocomplete.js' 

export class Search extends Component {
    constructor() {
        super()
        this.state = {
        }
    }

    render() {
        const { userInput } = this.state

        return (
            <div>
                <form action="" onSubmit={this.handleSubmit}>
                    < InputAutocomplete />
                    <button type="submit">Get Started ➡</button>
                </form>
                <button>Generate Word ⚡</button>
            </div>
        )
    }
}

export default Search
