/* eslint-disable */
import React, { Component } from "react";
import { Navbar, Button, Form, FormControl } from "react-bootstrap";
import Pubsub from "pubsub-js";
import pokedexIcon from "./../assets/images/pokedex-icon.png";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { search: "", dirty: false };
  }

  handleKeyPress(event) {
    if (event.charCode == 13) {
      event.preventDefault();
      this.updateFilters();
    }
  }

  handleBtnSearch(event) {
    event.preventDefault();
    this.updateFilters();
  }

  updateFilters() {
    console.log("this.state.search", this.state.search);
    Pubsub.publish("callAction", {
      action: "update-filters",
      data: {
        filter: "search",
        filters: this.state.search
      }
    });
  }

  handleBtnClean() {
    this.state.search = "";
    this.setState({
      search: "",
      dirty: false
    });
    this.updateFilters();
  }

  updateFilterValue(e) {
    this.setState({
      search: e.target.value,
      dirty: e.target.value != "" ? true : false
    });
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">
          <img src={pokedexIcon} style={{ height: "43px" }} /> Pokedex
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Form inline>
            <FormControl
              value={this.state.search}
              onChange={this.updateFilterValue.bind(this)}
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onKeyPress={this.handleKeyPress.bind(this)}
            />
            <Button
              onClick={this.handleBtnSearch.bind(this)}
              variant="outline-danger"
            >
              Search
            </Button>
            {this.state.dirty ? (
              <Button
                onClick={this.handleBtnClean.bind(this)}
                variant="outline-success"
                style={{ marginLeft: "10px" }}
              >
                Clear
              </Button>
            ) : (
              ""
            )}
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
