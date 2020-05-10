import React, { Component } from 'react';
import firebase from './firebase.js';
import '../styles/gallery.scss';

class Gallery extends Component {
    constructor() {
        super()
        this.state = {
            firebaseDataObject: [],
            poemsToShow: 6
        }
    }

    componentDidMount() {
        // get data from FB, save it to state
        const dbRef = firebase.database().ref();
        dbRef.on( 'value', (result) => this.setState({ firebaseDataObject: result.val() }) )
    }

    showMoreLessClick = (number) => this.setState({ poemsToShow: this.state.poemsToShow + number })

    render() { 
        const { firebaseDataObject, poemsToShow } = this.state
        const { changePage } = this.props
        return (
            <div className="app__container__gallery">
                <h1>Some Poetic Title for a Gallery</h1>
                <div className="app__container__gallery__grid">
                    {/* map over array from firebase. slice to control how many results to show */
                    Object.values(firebaseDataObject).reverse().slice(0, poemsToShow).map(({ title, author, poem }, index) => {
                        return(
                            <div key={Object.keys(firebaseDataObject)[index]}
                            className="app__container__gallery__grid__poem">
                                <h2>{title}</h2>
                                <p>by: {author}</p>
                                {
                                poem.map((wordObj) => {
                                    return( // fix below class name. just need temp styling for now
                                        <div key={wordObj.order} 
                                        className="app__container__gallery__grid__poem__word">
                                            {wordObj.content}
                                        </div>
                                    ) 
                                })
                                }
                            </div>
                        )
                    })
                    }
                </div>
                <div className="app__container__gallery__buttons">    
                    <button onClick={() =>this.showMoreLessClick(-10)}
                    className="main-button">Less -</button>
                    <button onClick={() =>this.showMoreLessClick(10)}
                    className="main-button">More +</button>
                    <button onClick={() => changePage('landing')}
                    className="secondary-button">Home</button>
                </div>
            </div>
        )
    }
}

export default Gallery;