import React, { Component } from 'react'

class ModalStart extends Component {
  constructor() {
    super()
    this.state = {hide : false}
  }

  hideModal = () => this.setState({hide: true})

  animationEnd = () => {
    if (this.state.hide) {
      this.props.showModal(false)
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
        onAnimationEnd={() => this.animationEnd()}
      >
        <div className="modalInner">
          <img src="" alt="illustration of a person deep in thought"/>
          <h2>How it works</h2>
          <p>We've generated a bunch of words for you on the left. Simply drag and drop them into your canvas on the right!</p>
          <button onClick={this.hideModal}>Start <span>🧲</span></button>
        </div>
      </div>
    )
  }
}

export default ModalStart