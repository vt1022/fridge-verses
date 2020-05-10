import React, { Component } from 'react';

class GeneratedWord extends Component {

    constructor() {
        super();
    }
 
    handleClick = (e) => {
        this.props.generatedWordClick(this.props.word)
    }


    render() {
        return (
            <button key={this.props.word.id} id={this.props.word.id}
                className={"app__container__gameBoard__generated__item" + (this.props.word.disabled ? " disabled" : "")}
                disabled={this.props.word.disabled}
                onClick={this.handleClick}>
                {this.props.word.content}
            </button>
        )
    }

}

export default GeneratedWord