import React, { Component } from 'react'
import Search from './components/Search.js'

class HomeLeft extends Component {
  constructor() {
    super()
    this.state = {

    }
  }
  

  render() {
    return(
      <div className="homeLeft">
        <h1>Recreate the IRL fun of magnetic poetry</h1>
        <Search />
        <p>Give us your own promt to kick things off or let us generate a word for you.</p>
      </div>
    )
  }
}

export default HomeLeft