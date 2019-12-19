import React, { Component } from "react";
import { Link } from "react-router";
import { Button } from "react-bootstrap";

export default class PokemonRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: this.props.pokemon,
      onRow: false,
      specialAttack: this.props.pokemon["Special Attack(s)"]
        ? this.props.pokemon["Special Attack(s)"].length
        : 0,
      fastAttack: this.props.pokemon["Fast Attack(s)"]
        ? this.props.pokemon["Fast Attack(s)"].length
        : 0
    };
  }

  toggleHover(bool) {
    this.setState({ onRow: bool });
  }

  render() {
    return (
      <tr
        onMouseEnter={this.toggleHover.bind(this, true)}
        onMouseLeave={this.toggleHover.bind(this, false)}
      >
        <td>{this.props.pokemon.Name}</td>
        <td>{this.props.pokemon.Generation.replace("Generation ", "")}</td>
        <td>
          {this.props.pokemon.Types ? this.props.pokemon.Types.join(", ") : ""}
        </td>
        <td>{this.state.fastAttack + this.state.specialAttack}</td>
        <td>
          {this.state.onRow ? (
            <Link
              to={`/pokemon/${this.props.pokemon.Number}`}
              className="pure-menu-heading"
            >
              <Button
                /*onClick={this.handleBtnClick.bind(this)}*/
                variant="danger"
                size="sm"
              >
                <i
                  className="material-icons"
                  style={{
                    position: "relative",
                    top: "4px",
                    marginRight: "5px",
                    fontSize: "17px"
                  }}
                >
                  details
                </i>
                Detalhes
              </Button>
            </Link>
          ) : (
            ""
          )}
        </td>
      </tr>
    );
  }
}
