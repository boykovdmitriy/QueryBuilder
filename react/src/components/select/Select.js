import React from 'react'

export const Select = ({options, onChange, selectedOption}) => (
  <select onChange={onChange} value={selectedOption}>
    {
      options.map(x => (
        <option
          key={x}
          value={x}
        >
          {x}
        </option>
      ))
    }
  </select>
)