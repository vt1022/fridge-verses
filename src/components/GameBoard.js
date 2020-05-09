import React, { Component } from 'react';
import Modal from './Modal.js'

import { ListManager } from 'react-beautiful-dnd-grid';
import firebase from './firebase.js';

const sortList = (list) => list.slice().sort((first, second) => first.order - second.order)

const ListElement = ({ item: { content } }) => 
    <div className="app__container__gameBoard__dragbox__item">{content}</div>

class GameBoard extends Component {
    constructor() {
        super();
        this.state = {
            modal: true,
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
        // disable buttons after clicked
        document.getElementById(wordObject.id).setAttribute("disabled", true)
        document.getElementById(wordObject.id).classList.add("disabled")
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
            const dbRef = firebase.database().ref()
            dbRef.push(sortedList)
        // error handling:
        } else if (sortedList.length < 3) {
            alert('You need more than 2 words in your poem.')
        } else if (sortedList.length > maxWordsInPoem ) {
            alert(`Your poem is too long! Nothing longer than ${maxWordsInPoem} please.`)
        }
    }

    render() {
        const { sortedList, modal } = this.state
        return(
            <>
                <Modal show={modal} showModal={this.showModal} 
                whichModal="start" changePage={this.props.changePage} />
                <div className="app__container__gameBoard">
                    <div className="app__container__gameBoard__generated">
                        {
                            this.props.generatedWords.map((word) => {
                                return(
                                    <button key={word.id} id={word.id}
                                    className="app__container__gameBoard__generated__item"
                                    onClick={() => this.generatedWordClick(word)}>
                                        {word.content}
                                    </button>
                                )
                            })
                        }
                    </div>
                    <div className="app__container__gameBoard__dragbox">
                        <ListManager
                        items={sortedList}
                        direction="horizontal"
                        maxItems={5}
                        render={(item) => <ListElement item={item} />}
                        onDragEnd={this.reorderList} />
                        <button onClick={this.clearPoem}>Clear</button>
                        <button onClick={this.savePoem}>Save to Gallery</button>
                    </div>
                </div>
            </>
        )
    }
}

export default GameBoard