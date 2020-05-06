import React, { Component } from 'react';
import axios from 'axios';
import InputAutocomplete from './InputAutocomplete.js' 

export class Search extends Component {
    constructor() {
        super()
        this.state = {
            userInput: "",
            words: []

            
        }
    }

    onAutoCompleteItemSelected = (event) => {
        // When the user uses the arrow keys or a mouse to select items
        // from the autocomplete dropdown, onChange is not fired for the 
        // text input. Instead, we have to listen to onChange for the parent element.
        this.setState({
            userInput: event.target.innerText
        });
    }   

    onTextChange = (event) => {

        this.setState({
            userInput: event.target.value
        });

        if (this.state.userInput.trim() !== "") {
            axios("https://api.datamuse.com/sug?s=" + this.state.userInput)
                .then(result => {
                    this.setState({
                        words: result.data
                    })
                });
        }
        else {
            this.setState({
                words: []
            })
        }
    }


    handleSubmit = (event) => {
        event.preventDefault();
    }    

    render() {
        const { userInput } = this.state

        return (
            <div>
                <form action="" onSubmit={this.handleSubmit}>
                    < InputAutocomplete onTextChange={this.onTextChange} words={this.state.words} onAutoCompleteItemSelected={this.onAutoCompleteItemSelected}/>
                    <button type="submit">Get Started ➡</button>
                </form>
                <button>Generate Word ⚡</button>
            </div>
        )
    }
}

export default Search
