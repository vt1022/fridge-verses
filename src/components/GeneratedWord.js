import React, { Component } from 'react';

class GeneratedWord extends Component {

    constructor() {
        super();
        this.state = {
            disabled: false
        }
    }

    handleClick = (e) => {
        this.props.generatedWordClick(this.props.word)

        // disable buttons after clicked
        this.setState({
            disabled: true
        })
    }


    render() {
        return (
            <button key={this.props.word.id} id={this.props.word.id}
                className={"app__container__gameBoard__generated__item" + (this.state.disabled ? " disabled" : "")}
                disabled={this.state.disabled}
                onClick={this.handleClick}>
                {this.props.word.content}
            </button>
        )
    }

}

export default GeneratedWord