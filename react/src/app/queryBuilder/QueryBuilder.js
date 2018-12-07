import React, { PureComponent } from 'react'
import { QueryBuilderGroup } from './QueryBuilderGroup'
import { QueryBuilderHOC } from './QueryBuilderHOC'
import './QueryBuilder.css'

class QueryBuilder extends PureComponent {
  render () {
    const {onNodeChanged, onNodeRemove, onRuleAdded, onGroupAdded, queryTree} = this.props
    return (
      <QueryBuilderGroup
        onNodeChanged={onNodeChanged}
        onNodeRemove={onNodeRemove}
        onRuleAdded={onRuleAdded}
        onGroupAdded={onGroupAdded}
        queryTree={queryTree}
        isRoot
      />
    )
  }
}

export default QueryBuilderHOC(QueryBuilder)