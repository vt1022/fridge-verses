import React from 'react';

class Gallery extends Component {
    constructor() {
        super()
        this.state = {

        }
    }

    componentDidMount() {
        // firebase stuff and poemSubmit will probably be moved to a gallery component later?
        // firebase:
        const dbRef = firebase.database().ref();
        dbRef.on('value', (result) => {
            const data = result.val()
        })
        // firebase ---
    }

    goHome = () => {

    }

    render() { 
        return ( 
            <section className="gallery">
                <h1>Some Poetic Title for a Gallery</h1>
                <div className="galleryGrid">
                    {/* map over array of data from firebase */}
                </div>
                <button>More v</button>
                <button>Home</button>
            </section>
        )
    }
}

export default Gallery;