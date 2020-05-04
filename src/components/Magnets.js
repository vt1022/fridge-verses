import React from 'react'

function Magnets(props) {

    const onDragStart = e => {
        const target = e.target;

        e.dataTransfer.setData('magnetID', target.id)

        // this allows a little bit of a delay so card does not disappear immediately when picked up
        setTimeout(() => {
            target.style.display = "none"
        }, 0)
    }

    // this prevents other events being fired when dragging
    const dragOver = e => {
        e.stopPropagation();
    }

    return (
        <div
            id={props.id}
            className={props.className}
            draggable="true"
            onDragStart={onDragStart}
            onDragOver={dragOver}
        >
            { props.children }
        </div>
    )
}

export default Magnets
