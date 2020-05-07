import React, { Component } from 'react';
import InputAutocomplete from './InputAutocomplete.js' 
import ModalStart from '../ModalStart.js'
import axios from 'axios'

export class Search extends Component {
    constructor() {
        super()
        this.state = {
            userInput: "",
            words: [],
            modalStart: false
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
                    //for loop to ensure only single words are suggested
                    let singleWords = []
                    for (let i=0; i < result.data.length; i++) {
                        if (! result.data[i]['word'].includes(" ")) {
                            singleWords.push(result.data[i])
                        }
                    }

                    this.setState({
                        words: singleWords
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

    showModal = (e, modalShow) => {
        e.preventDefault()
        this.setState({modalStart: modalShow})
        // load next page here also.
    }

    render() {
        const { userInput } = this.state
        const { modalStart } = this.state
        return (
            <div>
                <ModalStart show={modalStart} showModal={this.showModal} />
                <form action="" onSubmit={(e) => this.showModal(e, true)}>
                    <InputAutocomplete onTextChange={this.onTextChange} words={this.state.words} onAutoCompleteItemSelected={this.onAutoCompleteItemSelected} />
                    <button className="main-button" type="submit">Get Started</button>
                </form>
                <button className="secondary-button">Generate Word</button>
            </div>
        )
    }
}

export default Search
