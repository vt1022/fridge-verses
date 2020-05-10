import React, { Component } from 'react';
import firebase from './firebase.js';

class Gallery extends Component {
    constructor() {
        super()
        this.state = {
            firebaseDataObject: []
        }
    }

    componentDidMount() {
        // get data from FB, save it to state
        const dbRef = firebase.database().ref();
        dbRef.on( 'value', (result) => this.setState({ firebaseDataObject: result.val() }) )
    }

    render() { 
        const { firebaseDataObject } = this.state
        const { changePage } = this.props
        console.log(firebaseDataObject)
        return (
            <div className="app__container__gallery">
                <h1>Some Poetic Title for a Gallery</h1>
                <div className="app__container__gallery__grid">
                    {/* map over array from firebase. slice to control how many results to show */
                    Object.values(firebaseDataObject).slice(0, 6).map(({ title, author, poem }) => {
                        return(
                            <div className="app__container__gallery__grid__poem">
                                <h2>{title}</h2>
                                <h3>by: {author}</h3>
                                <div className="app__container__gallery__grid__poem__body">
                                    {
                                    poem.map((wordObj) => {
                                        return( // fix below class name. just need temp styling for now
                                            <div className="app__container__gameBoard__dragbox__item">
                                                {wordObj.content}
                                            </div>
                                        ) 
                                    })
                                    }
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
                <button>More v</button>
                <button onClick={() => changePage('landing')}>Home</button>
            </div>
        )
    }
}

export default Gallery;