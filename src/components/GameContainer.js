import React from 'react'
import Magnets from './Magnets'
import Frame, { FrameContextConsumer } from 'react-frame-component'
import MagnetBoard from './MagnetBoard'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'


// this component will take in props array (the words) to make the 30 magnets

const FrameBindingContext = ({ children }) => (
    <FrameContextConsumer>
        {({ window }) => (
            <DndProvider backend={HTML5Backend} context={window}>
                {children}
            </DndProvider>
        )}
    </FrameContextConsumer>
)
// Don't use the decorator, embed the DnD context within the iframe
export default function GameContainer(props) {

    const words = props.words;

    // The react-frame-component will pass the iframe's 'window' global as a context value
    // to the DragDropContext provider. You could also directly inject it in via a prop.
    // If neither the prop or the context value for 'window' are present, the DndProvider
    // will just use the global window.
    return (
        <>
            <Frame style={{ width: '100%', height: 400 }}>
                <FrameBindingContext>
                    <div>
                        <div style={{ overflow: 'hidden', clear: 'both' }}>
                            <MagnetBoard />
                        </div>
                        <div style={{ overflow: 'hidden', clear: 'both' }}>
                            <Magnets name="Glass" />
                        
                        </div>
                    </div>
                </FrameBindingContext>
            </Frame>
        </>
    )
}