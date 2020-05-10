import React, { Component } from 'react';
import Modal from './Modal.js'
import GeneratedWord from './GeneratedWord.js'
import { ListManager } from 'react-beautiful-dnd-grid';
import { TwitterShareButton } from "react-share";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const sortList = (list) => list.slice().sort((first, second) => first.order - second.order)
// draggable items generated by beautiful-dnd-grid:
const ListElement = ({ item: { content } }) => 
    <div className="app__container__gameBoard__dragbox__item">{content}</div>

class GameBoard extends Component {
    constructor() {
        super();
        this.state = {
            modal: true,
            modalToShow: 'start',
            sortedList: [],
            wordOrder: 0,
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
        const { sortedList, wordOrder } = this.state
        const { id, content } = wordObject
        // filter word out if it is already in sortedList
        const newList = [...sortedList].filter((item) => item.content != wordObject.content)
        newList.push({
            id: id, 
            order: wordOrder, 
            content: content
        });
        
        this.setState({
            sortedList: sortList(newList),
            wordOrder: wordOrder + 1
        })

        this.props.disableWord(wordObject.id);
    }

    saveToGalleryClick = () => {
        const { sortedList } = this.state
        const maxWordsInPoem = 20 // placeholder number for now
        if (sortedList.length <= maxWordsInPoem && sortedList.length > 5) {
            this.setState({modalToShow: "share"})
            this.showModal(true)
        // 1st level error handling:
        } else if (this.state.sortedList.length < 6) {
            alert("You need more than 5 words in your poem.")
        } else if (sortedList.length > maxWordsInPoem ) {
            alert(`Your poem is too long! Nothing longer than ${maxWordsInPoem} please.`)
        } else {
            alert("Safi, please stop bringing my shit again.")
        }
    }

    clearPoem = () => {
        this.setState({
            sortedList: [],
            wordOrder: 0
        })

        // remove disabled and disabled style from words: 
        this.props.enableAllWords();
    }

    poemString = () => {
        const rawWords = this.state.sortedList.map(wordObject => wordObject.content)
        return rawWords.join(' ')
    }

    render() {
        const { sortedList, modal, modalToShow, wordOrder } = this.state
        return(
            <>
                <Modal show={modal} showModal={this.showModal} 
                whichModal={modalToShow} changePage={this.props.changePage} 
                sortedList={sortedList} />
                <div className="app__container__gameBoard">
                    <div className="app__container__gameBoard__generated">
                        <h2>Themed words:</h2>
                        {
                            this.props.generatedWords.map((word) => {
                                return(
                                    <GeneratedWord id={word.id} word={word} generatedWordClick={this.generatedWordClick} />
                                )
                            })
                        }
                    </div>
                    <div className="app__container__gameBoard__dragbox">
                        <h2>Create a 6 - 20 words poem:</h2>
                        <p>{wordOrder} / 20</p>
                        <ListManager
                        items={sortedList}
                        direction="horizontal"
                        maxItems={5}
                        // render={(item) => <ListElement word={item} generatedWordClick={() => {}} />}
                        render={(item) => <ListElement item={item} />}
                        onDragEnd={this.reorderList} />
                        <button onClick={this.clearPoem}>Clear</button>
                        <button onClick={this.saveToGalleryClick}>Save to Gallery</button>
                        <TwitterShareButton url="https://bit.ly/2yHFNdM"
                        title={`Check out my poem!\n${this.poemString()}\nCreate your own:`} >
                            <button>Share <FontAwesomeIcon icon={faTwitter}/></button>
                        </TwitterShareButton>
                    </div>
                </div>
            </>
        )
    }
}

export default GameBoard