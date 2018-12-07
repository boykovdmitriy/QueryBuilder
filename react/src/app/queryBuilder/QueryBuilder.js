import React, {PureComponent} from 'react';
import {QueryBuilderGroup} from './QueryBuilderGroup'
import {QueryBuilderHOC} from './QueryBuilderHOC'

class QueryBuilder extends PureComponent {
  render() {
    const {onNodeChanged, onNodeRemove, onRuleAdded, onGroupAdded, queryTree} = this.props;
    return (
      <section>
        <QueryBuilderGroup
          onNodeChanged={onNodeChanged}
          onNodeRemove={onNodeRemove}
          onRuleAdded={onRuleAdded}
          onGroupAdded={onGroupAdded}
          queryTree={queryTree}
          isRoot
        />
      </section>
    )
  }
}

export default QueryBuilderHOC(QueryBuilder)