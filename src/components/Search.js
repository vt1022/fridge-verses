import React, { Component } from 'react';
import InputAutocomplete from './InputAutocomplete.js' 
import ModalStart from '../ModalStart.js'

export class Search extends Component {
    constructor() {
        super()
        this.state = {
            modalStart: false
        }
    }

    showModal = (e, modalShow) => {
        e.preventDefault()
        this.setState({modalStart: modalShow})
        // load next page here also.
    }

    render() {
        const { modalStart } = this.state
        return (
            <div>
                <ModalStart show={modalStart} showModal={this.showModal} />
                <form action="" onSubmit={(e) => this.showModal(e, true)}>
                    < InputAutocomplete />
                    <button type="submit">Get Started ➡</button>
                </form>
                <button>Generate Word ⚡</button>
            </div>
        )
    }
}

export default Search
