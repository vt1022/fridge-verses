import React, { Component } from 'react';
import InputAutocomplete from './InputAutocomplete.js' 
import ModalStart from '../ModalStart.js'
import axios from 'axios'

export class Search extends Component {
    constructor() {
        super()
        this.state = {
            userInput: "",
            autoCompleteWords: [],
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
                        autoCompleteWords: singleWords
                    })
                });
        }
        else {
            this.setState({
                autoCompleteWords: []
            })
        }
    }


    handleSubmit = (event) => {
        event.preventDefault();
        this.showModal(event, true)
//////////////////////////////////////////////////////////////////////////////
        axios({
            method: 'GET',
            url: `https://api.datamuse.com/words`,
            params: {
                rel_trg: this.state.userInput,
                max: 50
            }
        })
        .then((res) => {
            const generatedWords = res.data.map((value) => {
                return value.word
            })
            
            this.props.setGeneratedWords(generatedWords)
        })
    }    

    showModal = (e, modalShow) => {
        e.preventDefault()
        this.setState({modalStart: modalShow})
        // load next page here also.
    }

    render() {
        const { userInput } = this.state;
        const { modalStart } = this.state;
        return (
            <div>
                <ModalStart show={modalStart} showModal={this.showModal} />
                <form action="" onSubmit={this.handleSubmit}>
                    <InputAutocomplete onTextChange={this.onTextChange} autoCompleteWords={this.state.autoCompleteWords} onAutoCompleteItemSelected={this.onAutoCompleteItemSelected} />
                    <button type="submit">Get Started ➡</button>
                </form>
                <button>Generate Word ⚡</button>
            </div>
        )
    }
}  


export default Search
