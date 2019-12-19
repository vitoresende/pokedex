import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

export default class PokemonCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: this.props.pokemon,
      separated: this.props.separated
    };
  }

  render() {
    return (
      <Container
        className={this.state.separated ? "separated margins20" : "margins20"}
      >
        <Row className="bottom10">
          <Col xs={12} md={2} className="bold">
            Nome:
          </Col>
          <Col xs={12} md={10} className="left">
            {this.state.pokemon.Name ? this.state.pokemon.Name : ""}
          </Col>
        </Row>
        <Row className="bottom10">
          <Col xs={12} md={2} className="bold">
            Geração:
          </Col>
          <Col xs={12} md={10} className="left">
            {this.state.pokemon.Generation
              ? this.state.pokemon.Generation.replace("Generation ", "")
              : ""}
          </Col>
        </Row>
        <Row className="bottom10">
          <Col xs={12} md={2} className="bold">
            Descrição:
          </Col>
          <Col xs={12} md={10} className="left">
            {this.state.pokemon.About ? this.state.pokemon.About : ""}
          </Col>
        </Row>
        <Row className="bottom10">
          <Col xs={12} md={2} className="bold">
            Tipos:
          </Col>
          <Col xs={12} md={10} className="left">
            {this.state.pokemon.Types
              ? this.state.pokemon.Types.join(", ")
              : ""}
          </Col>
        </Row>
        <Row className="bottom10">
          <Col xs={12} md={2} className="bold">
            Resistências:
          </Col>
          <Col xs={12} md={10} className="left">
            {this.state.pokemon.Resistant
              ? this.state.pokemon.Resistant.join(", ")
              : ""}
          </Col>
        </Row>
        <Row className="bottom10">
          <Col xs={12} md={2} className="bold">
            Fraquezas:
          </Col>
          <Col xs={12} md={10} className="left">
            {this.state.pokemon.Weaknesses
              ? this.state.pokemon.Weaknesses.join(", ")
              : ""}
          </Col>
        </Row>
        <Row className="bottom10">
          <Col xs={12} md={2} className="bold">
            Ataques rápidos:
          </Col>
          <Col xs={12} md={10} className="left">
            {this.state.pokemon["Fast Attack(s)"] &&
            this.state.pokemon["Fast Attack(s)"].length > 0
              ? this.state.pokemon["Fast Attack(s)"].map((attack, index) => {
                  return (
                    <ul key={`fast_${index}`}>
                      <li>
                        <strong>Nome: </strong> {attack.Name}
                      </li>
                      <li>
                        <strong>Tipo:</strong>
                        {attack.Type}
                      </li>
                      <li>
                        <strong>Dano:</strong>
                        {attack.Damage}
                      </li>
                    </ul>
                  );
                })
              : ""}
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={2} className="bold">
            Ataques especiais:
          </Col>
          <Col xs={12} md={10} className="left">
            {this.state.pokemon["Special Attack(s)"] &&
            this.state.pokemon["Special Attack(s)"].length > 0
              ? this.state.pokemon["Special Attack(s)"].map((attack, index) => {
                  return (
                    <ul key={`special_${index}`}>
                      <li>
                        <strong>Nome: </strong> {attack.Name}
                      </li>
                      <li>
                        <strong>Tipo:</strong>
                        {attack.Type}
                      </li>
                      <li>
                        <strong>Dano:</strong>
                        {attack.Damage}
                      </li>
                    </ul>
                  );
                })
              : ""}
          </Col>
        </Row>
      </Container>
    );
  }
}
