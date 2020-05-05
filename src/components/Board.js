import React from 'react'

function Board(props) {
    const drop = e => {
        
        e.preventDefault();
        const magnetID = e.dataTransfer.getData('magnetID');

        const magnet = document.getElementById(magnetID);
        // this is so the card gets removed from the board it's being pulled from
        magnet.style.display = 'block'

        // e.target is the board it's getting moved to, the child being appended is the magnet
        e.target.appendChild(magnet)
    }

    // this is to allowing the dropping of a magnet onto the poem board
    const dragOver = e => {
        e.preventDefault();
    }

    return (
        <div id={props.id}
            className={props.className}
            onDrop={drop}
            onDragOver={dragOver}
            
        >
            { props.children}
        </div>
    )
}

export default Board
