import React, { PureComponent } from 'react'
import { ALLOWED_QUERY_COMBINATORS } from '../../queryBuilder'
import { Select } from '../../components/select/Select'
import { Button } from '../../components/button/Button'
import { QueryBuilderRule } from './QueryBuilderRule'

export class QueryBuilderGroup extends PureComponent {
  handleCombinatorChanged = ({target: {value}}) => {
    const {queryTree, onNodeChanged} = this.props
    onNodeChanged(queryTree.id, {
      ...queryTree,
      combinator: value,
    })
  }

  renderRule = (rule) => {
    const {
      onNodeChanged,
      onNodeRemove,
      onRuleAdded,
      onGroupAdded,
    } = this.props

    if (rule.rules) {
      return (
        <QueryBuilderGroup
          key={rule.id}
          onNodeChanged={onNodeChanged}
          onNodeRemove={onNodeRemove}
          onRuleAdded={onRuleAdded}
          onGroupAdded={onGroupAdded}
          queryTree={rule}
        />
      )
    }

    return (
      <QueryBuilderRule
        onNodeChanged={onNodeChanged}
        onNodeRemove={onNodeRemove}
        rule={rule}
        key={rule.id}
      />
    )
  }

  render () {
    const {
      onNodeRemove,
      onRuleAdded,
      onGroupAdded,
      isRoot,
      queryTree: {
        combinator,
        rules,
        id
      }
    } = this.props
    return (
      <section>
        <section>
          <Select
            options={ALLOWED_QUERY_COMBINATORS}
            selectedValue={combinator}
            onChange={this.handleCombinatorChanged}
          />
          <Button onClick={() => onRuleAdded(id)}>+Rule</Button>
          <Button onClick={() => onGroupAdded(id)}>+Group</Button>
          {
            !isRoot && <Button onClick={() => onNodeRemove(id)}>x</Button>
          }
        </section>
        {
          rules.map(this.renderRule)
        }
      </section>
    )
  }
}