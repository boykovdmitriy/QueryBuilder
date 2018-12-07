import React from 'react'
import { QueryBuilder } from '../../queryBuilder'

export const QueryBuilderHOC = (WrappedComponent) => {
  return class extends React.PureComponent {
    constructor (props) {
      super(props)
      this.queryBuilder = new QueryBuilder(props.config)
      this.state = {
        queryTree: this.queryBuilder.getObjectTree()
      }
    }

    handleNodeChanged = (id, newNode) => {
      this.queryBuilder.changeNode(id, newNode)
      this.setState({queryTree: this.queryBuilder.getObjectTree()})
    }

    handleNodeRemove = (id) => {
      this.queryBuilder.removeNode(id)
      this.setState({queryTree: this.queryBuilder.getObjectTree()})
    }

    handleRuleAdd = (id) => {
      this.queryBuilder.addNode(id)
      this.setState({queryTree: this.queryBuilder.getObjectTree()})
    }

    handleGroupAdd = (id) => {
      this.queryBuilder.addGroup(id)
      this.setState({queryTree: this.queryBuilder.getObjectTree()})
    }

    render () {
      const {queryTree} = this.state
      return (
        <WrappedComponent
          onNodeChanged={this.handleNodeChanged}
          onNodeRemove={this.handleNodeRemove}
          onRuleAdded={this.handleRuleAdd}
          onGroupAdded={this.handleGroupAdd}
          queryTree={queryTree}
        />
      )
    }
  }
}