import React, { Component } from 'react';
import Modal from './Modal.js'
import Swal from 'sweetalert2';
import ListElement from './ListElement'
import { ListManager } from 'react-beautiful-dnd-grid';

import '../styles/gameBoard.scss'

const sortList = (list) => list.slice().sort((first, second) => first.order - second.order)

const listElement = ({ item: { content } }) => 
    <div className="generated__item">{content}</div>

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

    savePoem = () => {
        const { sortedList } = this.state // destructuring state for clean code
        const maxWordsInPoem = 10 // placeholder number for now
        if (sortedList.length <= maxWordsInPoem && sortedList.length > 2) {
            const dbRef = this.database().ref()
            // This was called on 'firedbase' but I'm being told it's undefined
            dbRef.push(sortedList)
        // error handling:
        } else if (sortedList.length < 3) {
            Swal.fire('You need more than 2 words in your poem.')
        } else if (sortedList.length > maxWordsInPoem ) {
            alert(`Your poem is too long! Nothing longer than ${maxWordsInPoem} please.`)
        }
    }

    render() {
        const { sortedList, modal, modalToShow } = this.state
        return(
            <>
                <Modal show={modal} showModal={this.showModal} 
                whichModal={modalToShow} changePage={this.props.changePage} 
                sortedList={sortedList} />
                <div className="container__game-board">
                    <div className="game-board__generated">
                        {
                            this.props.generatedWords.map((word) => {
                                return(
                                    <ListElement word={word} generatedWordClick={this.generatedWordClick} />
                                )
                            })
                        }
                    </div>
                    <div className="sandbox__container">
                        <h2 className="main-header">You're like a young Maya Angelou</h2>
                        <div className="game-board__sandbox">
                            <div className="sandbox__droppable">
                                <ListManager
                                    items={sortedList}
                                    direction="horizontal"
                                    maxItems={5}
                                    render={(item) => <ListElement word={item} generatedWordClick={() => {}} />}
                                    onDragEnd={this.reorderList} 
                                />
                            </div>
                            <div className="sandbox__buttons">
                                <button className="secondary-button" onClick={this.clearPoem}>Clear</button>
                                <button className="main-button" onClick={this.saveToGalleryClick}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default GameBoard