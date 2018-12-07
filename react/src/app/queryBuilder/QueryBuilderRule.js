import React, { PureComponent } from 'react'
import { Select } from '../../components/select/Select'
import { ALLOWED_QUERY_FIELDS, ALLOWED_QUERY_OPERATORS } from '../../queryBuilder'
import { Button } from '../../components/button/Button'

export class QueryBuilderRule extends PureComponent {
  handleFieldChanged = (value) => {
    console.log(value)
  }

  handleOperatorChanged = (value) => {
    console.log(value)
  }

  handleValueChanged = (value) => {
    console.log(value)
  }

  render () {
    const {
      onNodeRemove,
      rule: {
        field,
        operator,
        value,
        id
      }
    } = this.props;

    return (
      <section>
        <Select
          options={ALLOWED_QUERY_FIELDS}
          onChange={this.handleFieldChanged}
          selectedOption={field}
        />
        <Select
          options={ALLOWED_QUERY_OPERATORS}
          onChange={this.handleOperatorChanged}
          selectedOption={operator}
        />
        <input type="text" value={value} onChange={this.handleValueChanged}/>
        <Button onClick={() => onNodeRemove(id)}>x</Button>
      </section>
    )
  }
}