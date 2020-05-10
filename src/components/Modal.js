import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import imgInstruct from '../assets/illustrations--instruct.png'
import imgIllustrations from '../assets/illustrations--save.png'

import firebase from './firebase.js';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1A4542',
        },
    }
});

class Modal extends Component {
    constructor() {
        super()
        this.state = {
            hide : false,
            inputTitle: '',
            inputAuthor: ''
        }
    }

    hideModal = () => this.setState({hide: true})
    handleSubmit = (e) => e.preventDefault()
    bindInputAuthor = (e) => this.setState({inputAuthor: e.target.value})
    bindInputTitle = (e) => this.setState({inputTitle: e.target.value})

    animationEnd = () => {
        this.state.hide && this.props.showModal(false)
        this.setState({ hide: false })
    }
    
    savePoemClick = () => {
        const { sortedList } = this.props
        const { inputTitle, inputAuthor } = this.state
        const maxWordsInPoem = 20 // placeholder number for now

        if (sortedList.length <= maxWordsInPoem && sortedList.length > 5) {
            const dbRef = firebase.database().ref()
            const dataObjToFirebase = {
                title: inputTitle,
                author: inputAuthor,
                poem: sortedList
            }
            dbRef.push(dataObjToFirebase)
        // 2nd level error handling:
        } else if (sortedList.length < 6) {
            alert("You need more than 5 words in your poem.")
        } else if (sortedList.length > maxWordsInPoem ) {
            alert(`Your poem is too long! Nothing longer than ${maxWordsInPoem} please.`)
        } else {
            alert("Safi, please stop bringing my shit again.")
        }
        this.hideModal()
    }

    render() {
        const { show, whichModal } = this.props
        const { hide, inputAuthor, inputTitle } = this.state
        return(
            <div onAnimationEnd={() => this.animationEnd()}
            className={`app__container__modal ${hide ? "slideLeft" : ""} ${show ? "slideRight" : ""}`}>
                {   // check prop to see which modal to show:
                whichModal === "start" && // START modal: 
                <div className="app__container__modal__modalInner modalStart">
                    <img src={imgInstruct} alt="illustration of a person deep in thought"/>
                    <h2>How it works</h2>
                    <p>We've generated a bunch of words for you on the left. Simply drag and drop them into your canvas on the right!</p>
                    <button 
                    className="start_btn"
                    onClick={this.hideModal}>Start <span>🧲</span></button>
                </div>
                }
                {   // check prop to see which modal to show:
                whichModal === "share" && // SHARE modal: 
                <div className="app__container__modal__modalInner modalShare">
                    <img src={imgIllustrations} alt="illustration of a person sharing ideas to the digital cloud"/>
                    <h2>Share your poem</h2>
                    <form className="share_inputs" action="" onSubmit={this.handleSubmit}>
                        <MuiThemeProvider theme={theme}>
                            <TextField 
                            className="share_title"
                            variant="outlined"
                            label="Title"
                            placeholder=""
                            margin="normal"
                            helperText="Name your masterpiece"
                            margin="normal"
                            size="medium"
                            id="poemTitle"
                            value={inputTitle}
                            onChange={this.bindInputTitle}
                            />
                            <TextField 
                            className="share_author"
                            variant="outlined"
                            label="Author"
                            placeholder=""
                            margin="normal"
                            helperText="sign your masterpiece"
                            margin="normal"
                            size="medium"
                            id="poemAuthor"
                            value={inputAuthor}
                            onChange={this.bindInputAuthor}
                            />
                        </MuiThemeProvider>
                        <button className="gallery_btn" onClick={this.savePoemClick}>
                            Submit
                        </button>
                        <button className="share_btn" onClick={this.hideModal}>
                            Cancel
                        </button>
                    </form>
                </div>
                }
            </div>
        )
    }
}

export default Modal;