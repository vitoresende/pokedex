import React, { Component } from "react";
import Pubsub from "pubsub-js";
import { Container } from "react-bootstrap";
import ListWithPagination from "./ListWithPagination";

export default class Pokedex extends Component {
  constructor() {
    super();
    this.state = { pokemons: [] };
  }

  componentWillMount() {
    this.callAction = Pubsub.publish("callAction", { action: "update-list" });
    this.pokemons = Pubsub.subscribe("pokemonlist", (topic, list) => {
      this.setState({ pokemons: list.pokemonFilter });
    });
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.callAction);
    PubSub.unsubscribe(this.pokemons);
  }

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <ListWithPagination list={this.state.pokemons}></ListWithPagination>
      </Container>
    );
  }
}
