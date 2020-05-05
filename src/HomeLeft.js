import React, { Component } from 'react'

class HomeLeft extends Component {
  constructor() {
    super()
    this.state = {
      userInput: ""
    }
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.userInput.trim() !== "") {
      // do something with the userInput here:
      console.log(this.state.userInput);
      // reset the input to empty string:
      this.setState({
        userInput: ""
      })
    } else {
      this.setState({
        userInput: ""
      })
    }
  }

  handleUserInput = (e) => {
    // take user input and save into state
    this.setState({
      userInput: e.target.value,
    })
    // bind value of input to input value = {userInput}
  }

  render() {
    const {userInput} = this.state
    return(
      <div className="homeLeft">
        <h1>Recreate the IRL fun of magnetic poetry</h1>
        <form action="" onSubmit={this.handleSubmit}>
          <label htmlFor="search">Type in a word</label>
          <input type="text" name="search" 
            id="search" value={userInput} 
            onChange={this.handleUserInput}/>
          <button type="submit">Get Started ➡</button>
        </form>
        <button>Generate Word ⚡</button>
        <p>Give us your own promt to kick things off or let us generate a word for you.</p>
      </div>
    )
  }
}

export default HomeLeft