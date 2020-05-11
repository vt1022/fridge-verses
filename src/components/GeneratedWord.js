import React, { Component } from 'react';

class GeneratedWord extends Component {
    handleClick = (e) => this.props.generatedWordClick(this.props.word)

    render() {
        const { id, disabled, content } = this.props.word
        return (
            <button key={id} id={id}
            tabIndex="0"
            className={"generated__item" + (disabled ? " disabled" : "")}
            disabled={disabled}
            onClick={this.handleClick}>
                {content}
            </button>
        )
    }

}

export default GeneratedWord