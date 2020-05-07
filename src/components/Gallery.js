import React from 'react';

class Gallery extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount() {
        const dbRef = firebase.database().ref();
        dbRef.on('value', (result) => {
            const data = result.val()
        })
    }

    goHome = () => {

    }

    render() { 
        return ( 
            <div className="app__container__gallery">
                <h1>Some Poetic Title for a Gallery</h1>
                <div className="app__container__gallery__grid">
                    {/* map over array of data from firebase */}
                </div>
                <button>More v</button>
                <button>Home</button>
            </div>
        )
    }
}

export default Gallery;