import React, { Component } from 'react'
import Board from './Board';
import Magnet from './Magnets';

class MagnetBoard extends Component {
    render() {
        return(
        <main className="flexbox">
        {/* here will be our boards */}
            <Board id="board-1" className="board">
                <Magnet id="magnet-1" className="magnet" draggable="true">
                <p>Cat</p>
                </Magnet>
                <Magnet id="magnet-2" className="magnet" draggable="true">
                <p>Dog</p>
                </Magnet>
                <Magnet id="magnet-3" className="magnet" draggable="true">
                <p>Bird</p>
                </Magnet>
            </Board>

            <Board id="board2" className="board">
                {/* empty board to drag shit into */}
            </Board>
        </main>
        )
    }
}

export default MagnetBoard