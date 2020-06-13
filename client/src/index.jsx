import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      descView: false,
      showCow: '',
      showDesc: '',
      cows: {
        Buttercup: '	a herbaceous plant with bright yellow cup-shaped flowers, common in grassland and as a garden weed. All kinds are poisonous and generally avoided by livestock.',
        Daisy: '	a small grassland plant that has flowers with a yellow disk and white rays. It has given rise to many ornamental garden varieties.',
        Milkshake:'a cold drink made of milk, a sweet flavoring such as fruit or chocolate, and typically ice cream, whisked until it is frothy.',
        Bessie: 'a person\'s best or closest friend.',
        MooDonna: '	archaic : lady -- used as a form of respectful address.',
        MooLawn: 'a legendary Chinese warrior from the Northern and Southern dynasties period (420–589) of Chinese history.'
      }

    }
  }


  handleClick(e){
    let name = e.target.innerHTML
    this.setState({
      descView: !false,
      showCow: name,
      showDesc: this.state.cows[name]
    })
  }
  render() {
    return (
    <div>
      <h1>Cow-List</h1>
      <div>
        <ol>
          <li>
            <p onClick={this.handleClick.bind(this)}>Buttercup</p>
          </li>
          <li>
            <p onClick={this.handleClick.bind(this)}>Daisy</p>
          </li>
          <li>
            <p onClick={this.handleClick.bind(this)}>Milkshake</p>
          </li>
          <li>
            <p onClick={this.handleClick.bind(this)}>Bessie</p>
          </li>
          <li>
            <p onClick={this.handleClick.bind(this)}>MooDonna</p>
          </li>
          <li>
            <p onClick={this.handleClick.bind(this)}>MooLawn</p>
          </li>
        </ol>
      </div>
      <div>
      </div>
    </div>  
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App/>, mountNode);