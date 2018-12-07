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
        <section
          key={rule.id}
          className="query-builder-group__rule"
        >
          <QueryBuilderGroup
            onNodeChanged={onNodeChanged}
            onNodeRemove={onNodeRemove}
            onRuleAdded={onRuleAdded}
            onGroupAdded={onGroupAdded}
            queryTree={rule}
          />
        </section>
      )
    }

    return (
      <section
        key={rule.id}
        className="query-builder-group__rule"
      >
        <QueryBuilderRule
          onNodeChanged={onNodeChanged}
          onNodeRemove={onNodeRemove}
          rule={rule}
        />
      </section>
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
      <section className="query-builder-group">
        <section className="query-builder-group__content">
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
        <section className="query-builder-group__rules">
          {
            rules.map(this.renderRule)
          }
        </section>
      </section>
    )
  }
}