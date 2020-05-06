import React, { Component } from 'react'

class ModalStart extends Component {
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

  render() {
    const {show} = this.props
    const {hide} = this.state
    return(
      <div 
        className={`modal 
          ${hide ? "slideLeft" : ""} 
          ${show ? "slideRight" : ""}`}
        onAnimationEnd={(e) => this.animationEnd(e)}
      >
        <div className="modalInner">
          <img src="./assets/illustrations--instruct.png" alt="illustration of a person deep in thought"/>
          <h2>How it works</h2>
          <p>We've generated a bunch of words for you on the left. Simply drag and drop them into your canvas on the right!</p>
          <button onClick={this.hideModal}>Start <span>🧲</span></button>
        </div>
      </div>
    )
  }
}

export default ModalStart