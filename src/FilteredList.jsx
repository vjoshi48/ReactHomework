import React, { Component } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import List from './List';

class FilteredList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      type: "all" // Added 'type' in the state with default value "all"
    };
  }

  // Sets the state whenever the user types on the search bar
  onSearch = (event) => {
    this.setState({ search: event.target.value.trim().toLowerCase() });
  };

  filterItem = (item) => {
    // Checks if the current search term is contained in this item
    // TODO: Add condition to check item’s type
    return (
      (item.name.toLowerCase().search(this.state.search) !== -1) &&
      (this.state.type.toLowerCase() === "all" || item.type.toLowerCase() === this.state.type.toLowerCase())
    );
  };

  /* TODO: Add an event handling method for when an item in the dropdown is selected
    Per the DropdownButton documentation, this function should take in an eventKey and event
  */
  handleTypeSelect = (eventKey, event) => {
    this.setState({ type: eventKey });
  };

  render() {
    return (
      <div>
        <div className="filter-list">
          <h1>Produce Search</h1>
          {/* TODO: Add more menu items with onSelect handlers*/}
          <DropdownButton id="typeDropdown" title={"Type"} onSelect={this.handleTypeSelect}>
            <Dropdown.Item eventKey="all">All</Dropdown.Item>
            <Dropdown.Item eventKey="fruit">Fruit</Dropdown.Item>
            <Dropdown.Item eventKey="vegetable">Vegetable</Dropdown.Item>
            {/* Add more items as needed */}
          </DropdownButton>
          <input type="text" placeholder="Search" onChange={this.onSearch} />
          <List items={this.props.items.filter(this.filterItem)} />
        </div>
      </div>
    );
  }
}

export default FilteredList;
