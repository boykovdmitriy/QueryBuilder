import React, { Component } from 'react';
import QueryBuilder from './queryBuilder/QueryBuilder'
import './App.css';

class App extends Component {
  state = {}

  handleQueryTreeChanged = (tree) => {
    this.setState({tree})
  }

  render() {
    const {tree} = this.state
    return (
      <div className="app">
        <section className="app__query-builder">
          <QueryBuilder
            onQueryTreeChanged={this.handleQueryTreeChanged}
          />
        </section>
        <section
          className="app__query-tree"
        >
          {
            JSON.stringify(tree, null, 4)
          }
        </section>
      </div>
    );
  }
}

export default App;
