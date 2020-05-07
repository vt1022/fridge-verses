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
        <h1 className="main-header">Recreate the IRL fun of magnetic poetry</h1>
        <div class="container__form">
          <Search />
          <p className="main-paragraph">Give us your own prompt to kick things off or let us a generate a theme for you</p>
        </div>
      </div>
    )
  }
}

export default HomeLeft