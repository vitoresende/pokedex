import React, { Component } from "react";
import { Container, Accordion, Card, Button } from "react-bootstrap";
import Pubsub from "pubsub-js";
import pokemonTriste from "./../assets/images/pikachu-triste.png";
import PokemonCard from "./PokemonCard.js";

export default class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: [],
      pokemons: []
    };
  }

  componentWillMount() {
    this.callAction = Pubsub.publish("callAction", { action: "update-list" });
    this.pokemonList = Pubsub.subscribe("pokemonlist", (topic, list) => {
      this.setState({
        pokemons: list.pokemon,
        pokemon: list.pokemonFilter.filter(
          pokemon => Number(pokemon.Number) == Number(this.props.params.id)
        )
      });
    });
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.callAction);
    PubSub.unsubscribe(this.pokemonList);
  }

  render() {
    if (this.state.pokemon.length <= 0) {
      return (
        <Container className="margins20">
          <img src={pokemonTriste} style={{ height: "43px" }} />
          <span>Não encontrei nenhum pokémon. :'(</span>
        </Container>
      );
    } else {
      return (
        <Container style={{ marginTop: "20px" }}>
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle
                  as={Button}
                  variant="link"
                  eventKey="0"
                  className="pokemon-title"
                >
                  {this.state.pokemon[0].Name}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <PokemonCard
                    pokemon={this.state.pokemon[0]}
                    separated={false}
                  ></PokemonCard>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
            {this.state.pokemon[0]["Next evolution(s)"] &&
            this.state.pokemon[0]["Next evolution(s)"].length > 0 ? (
              <Card>
                <Card.Header>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey="1"
                    className="pokemon-title"
                  >
                    Evoluções
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                  <Card.Body>
                    {this.state.pokemon[0]["Next evolution(s)"].map(
                      (pokemon, index) => {
                        return (
                          <PokemonCard
                            key={`next_evolution_${index}`}
                            pokemon={
                              this.state.pokemons.filter(
                                poke => poke["Name"] == pokemon["Name"]
                              )[0]
                            }
                            separated={
                              index !=
                              this.state.pokemon[0]["Next evolution(s)"]
                                .length -
                                1
                            }
                          ></PokemonCard>
                        );
                      }
                    )}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            ) : (
              ""
            )}
            {this.state.pokemon[0]["Previous evolution(s)"] &&
            this.state.pokemon[0]["Previous evolution(s)"].length > 0 ? (
              <Card>
                <Card.Header>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey="2"
                    className="pokemon-title"
                  >
                    Evoluções Anteriores
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="2">
                  <Card.Body>
                    {this.state.pokemon[0]["Previous evolution(s)"].map(
                      (pokemon, index) => {
                        return (
                          <PokemonCard
                            key={`previous_evolution_${index}`}
                            pokemon={
                              this.state.pokemons.filter(
                                poke => poke["Name"] == pokemon["Name"]
                              )[0]
                            }
                            separated={
                              index !=
                              this.state.pokemon[0]["Previous evolution(s)"]
                                .length -
                                1
                            }
                          ></PokemonCard>
                        );
                      }
                    )}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            ) : (
              ""
            )}
          </Accordion>
        </Container>
      );
    }
  }
}
