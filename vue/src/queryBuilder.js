export const ALLOWED_QUERY_OPERATORS = ['=', '>', '<', '!=']
export const ALLOWED_QUERY_COMBINATORS = ['AND', 'OR']
export const ALLOWED_QUERY_FIELDS = ['Address', 'Twitter', 'Instagram', 'Price']

function uuid () {
  return '_' + Math.random().toString(36).substr(2, 9)
}

const defaultGroup = groupFactory({
  rules: [
    ruleFactory()
  ]
})

function ruleFactory (attr = {}) {
  return {
    id: uuid(),
    field: ALLOWED_QUERY_FIELDS[0],
    value: 0,
    operator: ALLOWED_QUERY_OPERATORS[0],
    ...attr
  }
}

function groupFactory (attr = {}) {
  return {
    id: uuid(),
    rules: [ruleFactory()],
    combinator: ALLOWED_QUERY_COMBINATORS[0],
    ...attr
  }
}

export class QueryBuilder {
  constructor (config) {
    this.config = config || defaultGroup
    this.nodes = this.__buildNodes(this.config)
  }

  __buildNodes (config, parent = null) {
    return [
      this.__buildNode(config, parent),
      ...config.rules.reduce((acc, value) => {
        const isGroup = value.combinator && value.rules
        const nodes = isGroup ? this.__buildNodes(value, config) : [this.__buildNode(value, config)]
        return [...acc, ...nodes]
      }, [])
    ]
  }

  __buildNode (node, parent) {
    return {id: node.id, parent, node}
  }

  changeNode (nodeId, newNode) {
    const value = this.nodes.find(x => x.id === nodeId)
    const oldNode = value.node
    value.node = newNode
    value.id = newNode.id
    if (value.parent) {
      const index = value.parent.rules.indexOf(oldNode)
      value.parent.rules[index] = newNode
    }
  }

  removeNode (nodeId) {
    const {parent} = this.nodes.find(x => x.id === nodeId)
    parent.rules = parent.rules.filter(x => x.id !== nodeId)
    this.nodes = this.__buildNodes(this.config)
  }

  addNode (parentId) {
    const parentGroup = this.nodes.find(x => x.id === parentId)
    const rule = ruleFactory()
    parentGroup.node.rules.push(rule)
    this.nodes = this.__buildNodes(this.config)
  }

  addGroup (parentId) {
    const parentGroup = this.nodes.find(x => x.id === parentId)
    const group = groupFactory()
    parentGroup.node.rules.push(group)
    this.nodes = this.__buildNodes(this.config)
  }

  getObjectTree () {
    return JSON.parse(JSON.stringify(this.config))
  }
}