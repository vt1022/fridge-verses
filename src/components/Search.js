import React, { Component } from 'react';
import InputAutocomplete from './InputAutocomplete.js' 
import axios from 'axios'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Swal from 'sweetalert2';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1A4542',
        },
    },
    typography: {
        fontSize: 28,
        fontFamily: 'Kanit, Helvetica Neue Helvetica, Arial', 
    },
});

let badwordsArray = require('badwords/array');
badwordsArray.push("fuckup", "bitchy", "bitchery", "bitchiness", "bitched", "bitchen","bitchily","bitchier","bitchiest", "shittah", "shittim", "shitfaced", "shittle", "nigget", "niggerhead", "niggerheads", "niggerling", "nigged", "niggery", "niggle","niggardly","niggling","niggard","niggly","niggler","niggardliness","niggish", "faggy", "fagged", "faggots", "faggoty", "faggotry", "faggoting", "faggoted", "cunty", "cunted", "cunting","cummingtonite", "wetback","wetbacks", "spunk", "whoremonger", "whoring", "whorehouse", "hooker", "whoredom","whoremaster","whoremasters","whoremasterly","whored", "whores", "porn", "pornography", "slutty", "sluttish", "sluttery", "sluttishness", "sluttishly", "fucked-up")


export class Search extends Component {
    constructor() {
        super()
        this.state = {
            userInput: "",
            autoCompleteWords: [],
            randomWords: ["Kitten", "Tacos", "Hockey", "Monkey", "Muffin", "Boomer"]
        }
    }

    // When the user uses the arrow keys or a mouse to select items
    // from the autocomplete dropdown, onChange is not fired for the 
    // text input. Instead, we have to listen to onChange for the parent element.
    onAutoCompleteItemSelected = (event) => this.setState({ userInput: event.target.innerText })   
    
    onTextChange = (event) => {
        this.setState({ userInput: event.target.value });

        if (this.state.userInput.trim() !== "") {
            axios("https://cors-anywhere.herokuapp.com/https://api.datamuse.com/sug?s=" + this.state.userInput)
                .then(result => { //for loop to ensure only single words are suggested
                    const singleWords = []
                    for (let i=0; i < result.data.length; i++) {
                        if (!result.data[i]['word'].includes(" ") && badwordsArray.indexOf(result.data[i]['word']) === -1)  {
                            singleWords.push(result.data[i])
                        }
                    }
                    this.setState({ autoCompleteWords: singleWords })
                });
        }
        else {
            this.setState({
                autoCompleteWords: []
            })
        }
    }

    getRandomWord = () => {
        const randomWord = this.state.randomWords[Math.floor(Math.random() * this.state.randomWords.length)]
        this.setState({ userInput:randomWord })
    }    
    
    handleSubmit = async (event) => {
        event.preventDefault()
        let result = await axios({
            method: 'GET',
            url: `https://cors-anywhere.herokuapp.com/https://api.datamuse.com/words`,
            params: {
                topics: this.state.userInput,
                max: 40
            }
        })
        
        const generatedWords = result.data.map((value) => {
            return {content: value.word, id: JSON.stringify(value.score), disabled: false}
        })

        if (this.state.userInput.toLowerCase() === "boomer"){
            const safi = []
            for (let i = 0; i < 15; i++) {
                safi.push({ content: 'Safi', id: 50000 + i, disabled: false })
                safi.push({ content: 'Asaf', id: 60000 + i, disabled: false })
            }
            this.props.setGeneratedWords(safi)   
        } else {
            this.props.setGeneratedWords(generatedWords)
        }
        // Now get the functional words
        result = await axios({
            method: 'GET',
            url: `https://cors-anywhere.herokuapp.com/https://api.datamuse.com/words`,
            params: {
                rel_bga: this.state.userInput,
                max: 20
            }
        })

        const functionalWords = result.data.map((value) => {
            return { content: value.word, id: JSON.stringify(value.score), disabled: false }
        })
        this.props.setFunctionalWords(functionalWords)
        
        if (this.state.userInput.trim() === "") {
            Swal.fire({
                icon: 'error',
                text: "You can't search for nothing!",
            })
        } else if (generatedWords.length < 5) {
            Swal.fire({
                icon: 'error',
                text: "No results found, try adjusting your search term.",
            }) 
        } else {
            this.props.changePage('gameBoard')
        }
    }

    render() {
        const { userInput } = this.state
        return (
            <>
                <form action="" onSubmit={this.handleSubmit}>
                    <MuiThemeProvider theme={theme}>
                        <InputAutocomplete onTextChange={this.onTextChange} 
                        autoCompleteWords={this.state.autoCompleteWords} 
                        onAutoCompleteItemSelected={this.onAutoCompleteItemSelected} 
                        userInput = {userInput} 
                        borderColor="primary"
                        />
                    </MuiThemeProvider>

                    <button className="main-button" type="submit">
                        Get Started
                    </button>
                </form>
                <button className="secondary-button" 
                onClick={this.getRandomWord}>
                    Generate Word
                </button>
            </>
        )
    }
}  

export default Search
