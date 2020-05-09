import React, { Component } from 'react';
import firebase from './firebase.js';

class Gallery extends Component {
    componentDidMount() {
        // get data from FB, map over data to load on DOM
        const dbRef = firebase.database().ref();
        dbRef.on('value', (result) => {
            const data = result.val()
        })
    }

    goHome = () => {
        // go back to landing
    }

    render() { 
        const { changePage } = this.props
        return (
            // check prop to see which modal to show:
            <div className="app__container__gallery">
                <h1>Some Poetic Title for a Gallery</h1>
                <div className="app__container__gallery__grid">
                    {/* map over array of data from firebase */}
                </div>
                <button>More v</button>
                <button onClick={() => changePage('landing')}>Home</button>
            </div>
        )
    }
}

export default Gallery;