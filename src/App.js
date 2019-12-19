import React, { Component } from "react";
import "./assets/css/side-menu.css";
import "bootstrap/dist/css/bootstrap.css";
import Header from "./componentes/Header";
import PokemonStore from "./stores/PokemonStore";
const pokemonStore = new PokemonStore([]);

class App extends Component {
  componentWillMount() {
    pokemonStore.subscribe();
  }

  render() {
    return (
      <div>
        <Header></Header>
        <div id="main">{this.props.children}</div>
      </div>
    );
  }
}

export default App;
