import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Swal from 'sweetalert2'
import firebase from './firebase.js';

import imgInstruct from '../assets/illustrations--instruct.png'
import imgIllustrations from '../assets/illustrations--save.png'
import '../styles/modals.scss'

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
    bindInputAuthor = (e) => this.setState({inputAuthor: e.target.value})
    bindInputTitle = (e) => this.setState({inputTitle: e.target.value})

    animationEnd = () => {
        this.state.hide && this.props.showModal(false)
        this.setState({ hide: false })
    }
    
    savePoemClick = () => {
        const { sortedList, changePage } = this.props
        const { inputTitle, inputAuthor } = this.state
        const maxWordsInPoem = 20

        if (sortedList.length <= maxWordsInPoem && sortedList.length > 5) {
            const dbRef = firebase.database().ref()
            const dataObjToFirebase = {
                title: inputTitle,
                author: inputAuthor,
                poem: sortedList
            }
            dbRef.push(dataObjToFirebase)
            changePage('gallery')
        // 2nd level error handling:
        } else if (sortedList.length < 6) {
            Swal.fire({
                icon: 'error',
                text: "You need more than 5 words in your poem.",
            })
        } else if (sortedList.length > maxWordsInPoem ) {
            Swal.fire({
                icon: 'error',
                text: `Your poem is too long! Nothing longer than ${maxWordsInPoem} please.`,
            })
        } else {
            Swal.fire({
                icon: 'error',
                text: "Safi, repeat after me: O K  B O O M E R",
            })
        }
        this.hideModal()
    }

    render() {
        const { show, whichModal } = this.props
        const { hide, inputAuthor, inputTitle } = this.state
        return (
            <div onAnimationEnd={() => this.animationEnd()}
            className={`container__modal ${hide ? "slideLeft" : ""} ${show ? "slideRight" : ""}`}>

            {   // check prop to see which modal to show:
            whichModal === "start" && // START modal:  
                <div className="modal__instructions">
                    <div className="instructions__illustration">
                        <img src={imgInstruct} className="illustration__img" alt="illustration of a person deep in thought"/>
                    </div>
                    <div className="instructions__copy">
                        <h2 className="main-header">How it works</h2>
                        <p className="main-paragraph">We've generated a bunch of words for you. Simply tap on the words you'd like to use and they'll be added to the canvas. Rearrange your choices on the canvas by dragging dropping!</p>
                    </div>
                    <button 
                    className="main-button"
                    onClick={this.hideModal}>Start</button>
                </div>
            }
            {   // check prop to see which modal to show:
            whichModal === "share" && // SHARE modal: 
                <div className="modal__share">
                    <div className="share__illustration">
                        <img src={imgIllustrations} className="share__img" alt="illustration of a person sharing ideas to the digital cloud"/>
                    </div>
                    <div className="share__copy-form">
                        <h2 className="main-header">Share your poem</h2>
                        <form className="copy-form__input" action="" onSubmit={this.handleSubmit}>
                            <MuiThemeProvider theme={theme}>
                                <TextField 
                                required
                                className="share_title"
                                variant="outlined"
                                label="Title"
                                placeholder=""
                                margin="normal"
                                size="small"
                                id="poemTitle"
                                value={inputTitle}
                                onChange={this.bindInputTitle}
                                fullWidth
                                borderColor="primary"
                                />
                                <TextField 
                                required
                                className="share_author"
                                variant="outlined"
                                label="Author"
                                placeholder=""
                                margin="normal"
                                size="small"
                                id="poemAuthor"
                                value={inputAuthor}
                                onChange={this.bindInputAuthor}
                                fullWidth
                                borderColor="primary"
                                />
                            </MuiThemeProvider>
                            <button className="main-button main-button--share" onClick={this.savePoemClick}>
                                Submit
                            </button>
                            <button className="secondary-button secondary-button--cancel" onClick={this.hideModal}>
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            }
            </div>
        )
    }
}
                
export default Modal;