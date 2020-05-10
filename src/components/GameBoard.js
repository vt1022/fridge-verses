import React, { Component } from 'react';
import Modal from './Modal.js'
import ListElement from './ListElement'
import { ListManager } from 'react-beautiful-dnd-grid';

const sortList = (list) => list.slice().sort((first, second) => first.order - second.order)



class GameBoard extends Component {
    constructor() {
        super();
        this.state = {
            modal: true,
            modalToShow: 'start',
            sortedList: [],
            wordOrder: 0
        }
        
    }

    showModal = (modalShowBoolean) => this.setState({modal: modalShowBoolean})

    sortList = () => this.setState({sortedList: sortList(this.state.sortedList)})
    
    reorderList = (sourceIndex, destinationIndex) => {
        if (destinationIndex === sourceIndex) {
            return;
        }
        const list = this.state.sortedList;
        if (destinationIndex === 0) {
            list[sourceIndex].order = list[0].order - 1;
            this.sortList();
            return;
        }
        if (destinationIndex === list.length - 1) {
            list[sourceIndex].order = list[list.length - 1].order + 1;
            this.sortList();
            return;
        }
        if (destinationIndex < sourceIndex) {
            list[sourceIndex].order = (list[destinationIndex].order + list[destinationIndex - 1].order) / 2;
            this.sortList();
            return;
        }
        list[sourceIndex].order = (list[destinationIndex].order + list[destinationIndex + 1].order) / 2;
        this.sortList();
    }
    
    generatedWordClick = (wordObject) => {
        const { id, content } = wordObject
        // filter word out if it is already in sortedList
        const newList = [...this.state.sortedList].filter((item) => item.content != wordObject.content)
        newList.push({
            id: id, 
            order: this.state.wordOrder, 
            content: content
        });
        
        this.setState({
            sortedList: sortList(newList),
            wordOrder: this.state.wordOrder + 1
        })
    }

    saveToGalleryClick = () => {
        this.showModal(true)
        this.setState({modalToShow: "share"})
    }

    clearPoem = () => {
        this.setState({
            sortedList: [],
            wordOrder: 0
        })
    }

    render() {
        const { sortedList, modal, modalToShow } = this.state
        return(
            <>
                <Modal show={modal} showModal={this.showModal} 
                whichModal={modalToShow} changePage={this.props.changePage} 
                sortedList={sortedList} />
                <div className="app__container__gameBoard">
                    <div className="app__container__gameBoard__generated">
                        {
                            this.props.generatedWords.map((word) => {
                                return(
                                    <ListElement word={word} generatedWordClick={this.generatedWordClick} />
                                )
                            })
                        }
                    </div>
                    <div className="app__container__gameBoard__dragbox">
                        <ListManager
                        items={sortedList}
                        direction="horizontal"
                        maxItems={5}
                            render={(item) => <ListElement word={item} generatedWordClick={() => {}} />}
                        onDragEnd={this.reorderList} />
                        <button onClick={this.clearPoem}>Clear</button>
                        <button onClick={this.saveToGalleryClick}>Save to Gallery</button>
                    </div>
                </div>
            </>
        )
    }
}

export default GameBoard