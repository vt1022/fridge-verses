import React, { Component } from 'react';
import '../styles/modals.scss'
import TextField from '@material-ui/core/TextField';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import imgInstruct from '../assets/illustrations--instruct.png'
import imgIllustrations from '../assets/illustrations--save.png'

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
        this.state = {hide : false}
    }

    hideModal = () => this.setState({hide: true})

    animationEnd = (e) => {
        if (this.state.hide) {
        this.props.showModal(false)
        }
        this.setState({hide: false})
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }

    render() {
        const { show, whichModal } = this.props
        const { hide } = this.state
        return(
            <div 
                className={`app__container__modal 
                    ${hide ? "slideLeft" : ""} 
                    ${show ? "slideRight" : ""}`}
                onAnimationEnd={(e) => this.animationEnd(e)}
            >
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
                            size="small"
                            id="poemTitle"
                            />

                            <TextField 
                            className="share_author"
                            variant="outlined"
                            label="Author"
                            placeholder=""
                            margin="normal"
                            borderColor="primary"
                            helperText="sign your masterpiece"
                            margin="normal"
                            size="small"
                            id="poemAuthor"
                            />
                        </MuiThemeProvider>

                            {/* <label htmlFor="poemTitle">Title:</label>
                            <input type="text" name="poemTitle" id="poemTitle"/> */}

                            {/* <label htmlFor="poemAuthor">Author:</label>
                            <input type="text" name="poemAuthor" id="poemAuthor"/> */}
                            
                            {/* work on add to gallery function */}
                            <button 
                            className="gallery_btn"
                            onClick={this.hideModal}>Add to Gallery</button>
                            {/* work on share function */}
                            <button 
                            className="share_btn"
                            onClick={this.hideModal}>Share</button>
                        </form>
                    </div>
                }
            </div>
        )
    }
}

export default Modal;