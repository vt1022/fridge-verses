import React, { Component } from 'react'

class Modal extends Component {
    constructor() {
        super()
        this.state = {hide : false}
    }

    hideModal = () => this.setState({hide: true})

    animationEnd = (e) => {
        if (this.state.hide) {
        this.props.showModal(e, false)
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
        // check prop to see which modal to show:
            whichModal === "start" && // START modal: 
                <div 
                    className={`app__container__leftLanding__modal 
                        ${hide ? "slideLeft" : ""} 
                        ${show ? "slideRight" : ""}`}
                    onAnimationEnd={(e) => this.animationEnd(e)}
                >
                    <div className="app__container__leftLanding__modal__modalInner modalStart">
                        <img src="./assets/illustrations--instruct.png" alt="illustration of a person deep in thought"/>
                        <h2>How it works</h2>
                        <p>We've generated a bunch of words for you on the left. Simply drag and drop them into your canvas on the right!</p>
                        <button onClick={this.hideModal}>Start <span>🧲</span></button>
                    </div>
                </div>
        // check prop to see which modal to show:
            || whichModal === "share" && // SHARE modal: 
                <div 
                    className={`app__container__leftLanding__modal 
                        ${hide ? "slideLeft" : ""} 
                        ${show ? "slideRight" : ""}`}
                    onAnimationEnd={(e) => this.animationEnd(e)}
                >
                    <div className="app__container__leftLanding__modal__modalInner modalShare">
                        <img src="./assets/illustrations--save.png" alt="illustration of a person sharing ideas to the digital cloud"/>
                        <h2>Share your poem</h2>
                        <form action="" onSubmit={this.handleSubmit}>
                            <label htmlFor="poemTitle">Title:</label>
                            <input type="text" name="poemTitle" id="poemTitle"/>
                            <label htmlFor="poemAuthor">Author:</label>
                            <input type="text" name="poemAuthor" id="poemAuthor"/>
                            {/* work on add to gallery function */}
                            <button onClick={this.hideModal}>Add to Gallery</button>
                            {/* work on share function */}
                            <button onClick={this.hideModal}>Share</button>
                        </form>
                    </div>
                </div>
        )
    }
}

export default Modal