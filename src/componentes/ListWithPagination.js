/* eslint-disable */
import React, { Component } from "react";
import { Table, Pagination } from "react-bootstrap";
import $ from "jquery";

import PokemonRow from "./PokemonRow.js";

export default class ListWithPagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: { numberPagination: 1, active: 0, array: [] },
      pokemonList: []
    };
  }

  initialPagination() {}

  updatePagination(list) {
    const pagination = 20;
    const numberPagination = Math.round(list.length / pagination);
    const arrayrange = this.state.pagination.active * pagination;
    this.state.pagination.numberPagination = numberPagination;
    this.state.pagination.array = this.getArrayPagination(numberPagination - 1);
    this.state.pokemonList = list.slice(arrayrange, arrayrange + pagination);
  }

  getArrayPagination(number) {
    const active = this.state.pagination.active;
    if (number < 0) number = 1;
    if (number < 0) number = 0;
    if ((active === 0 && number < 2) || (active === number && number === 1)) {
      return [...Array(number).keys()];
    } else if (active === 0) {
      return [0, 1, 2];
    } else if (active === number) {
      return [active - 2, active - 1, active];
    } else {
      return [active - 1, active, active + 1];
    }
  }

  updatePaginationItem(value, event) {
    event.preventDefault();
    if (value === "+") {
      this.state.pagination.active += 1;
    } else if (value === "-") {
      this.state.pagination.active -= 1;
    } else if (value === "<") {
      this.state.pagination.active = 0;
    } else if (value === ">") {
      this.state.pagination.active = this.state.pagination.numberPagination - 1;
    } else {
      this.state.pagination.active = value;
    }
    this.updatePagination(this.props.list);
    this.setState(this.state);
  }

  componentWillUpdate(nextProps, nextState) {
    this.updatePagination(nextProps.list);
  }

  componentIsChecked() {
    if ($(".input-react-radio").is(":checked")) {
      this.props.callback(
        $(".input-react-radio:checked")[0].id.replace("inline-btn-", "")
      );
    } else {
      this.props.callback(false);
    }
  }
  render() {
    return (
      <div>
        <Table hover responsive>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Geração</th>
              <th>Tipos</th>
              <th>Qtd. Ataques</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.pokemonList.map(pokemon => {
              return (
                <PokemonRow key={pokemon.Number} pokemon={pokemon}></PokemonRow>
              );
            })}
          </tbody>
        </Table>
        <Pagination className="justify-content-md-center">
          {this.state.pagination.active > 0 ? (
            <Pagination.First
              onClick={this.updatePaginationItem.bind(this, "<")}
            />
          ) : (
            ""
          )}
          {this.state.pagination.active !== 0 ? (
            <Pagination.Prev
              onClick={this.updatePaginationItem.bind(this, "-")}
            />
          ) : (
            ""
          )}
          {this.state.pagination.array.map(list => {
            return (
              <Pagination.Item
                onClick={this.updatePaginationItem.bind(this, list)}
                key={list}
                active={list === this.state.pagination.active}
              >
                {list}
              </Pagination.Item>
            );
          })}
          {this.state.pagination.active !==
          this.state.pagination.numberPagination - 1 ? (
            <Pagination.Next
              onClick={this.updatePaginationItem.bind(this, "+")}
            />
          ) : (
            ""
          )}
          {this.state.pagination.active !==
          this.state.pagination.numberPagination - 1 ? (
            <Pagination.Last
              onClick={this.updatePaginationItem.bind(this, ">")}
            />
          ) : (
            ""
          )}
        </Pagination>
      </div>
    );
  }
}
