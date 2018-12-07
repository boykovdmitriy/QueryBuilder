import React from 'react'
import { QueryBuilder } from '../../../../shared/queryBuilder'

export const QueryBuilderHOC = (WrappedComponent) => {
  return class extends React.PureComponent {
    constructor (props) {
      super(props)
      this.queryBuilder = new QueryBuilder(props.config)
      this.state = {
        queryTree: this.queryBuilder.getObjectTree()
      }
    }

    componentDidMount() {
      const {onQueryTreeChanged} = this.props
      const {queryTree} = this.state
      onQueryTreeChanged(queryTree)
    }

    handleNodeChanged = (id, newNode) => {
      this.queryBuilder.changeNode(id, newNode)
      this.handleTreeChanged()
    }

    handleNodeRemove = (id) => {
      this.queryBuilder.removeNode(id)
      this.handleTreeChanged()
    }

    handleRuleAdd = (id) => {
      this.queryBuilder.addNode(id)
      this.handleTreeChanged()
    }

    handleGroupAdd = (id) => {
      this.queryBuilder.addGroup(id)
      this.handleTreeChanged()
    }

    handleTreeChanged = () => {
      const {onQueryTreeChanged} = this.props
      const queryTree = this.queryBuilder.getObjectTree()
      this.setState({queryTree})
      onQueryTreeChanged(queryTree)
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