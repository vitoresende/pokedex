import Pubsub from "pubsub-js";
const endpoint =
  "https://raw.githubusercontent.com/BrunnerLivio/PokemonDataGraber/master/output.json";

export default class PokemonStore {
  constructor(pokemonList) {
    this.pokemonList = pokemonList;
    this.pokemonListWithFilter = pokemonList;
    this.filtro = {};
  }

  getAll() {
    fetch(endpoint)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Não foi possível buscar as listas mockadas.");
        }
      })
      .then(list => {
        this.updatelist(list);
      });
  }

  updatelist(list = null) {
    if (list) this.pokemonList = list;
    this.pokemonList = this.pokemonList.filter(list => list.Number);
    this.pokemonListWithFilter = this.pokemonList;
    if (this.filtro.search && this.filtro.search !== "") {
      this.pokemonListWithFilter = this.pokemonList.filter(x =>
        x.Name.toLowerCase().includes(this.filtro.search.toLowerCase())
      );
    }

    Pubsub.publish("pokemonlist", {
      pokemonFilter: this.pokemonListWithFilter,
      pokemon: this.pokemonList
    });
  }

  updateFilters(data) {
    this.filtro[data.filter] = data.filters;
    this.updatelist();
  }

  subscribe() {
    Pubsub.subscribe("callAction", (topic, obj) => {
      if (obj.action === "update-list") {
        this.getAll();
      } else if (obj.action === "update-filters") {
        this.updateFilters(obj.data);
      }
    });
  }
}
