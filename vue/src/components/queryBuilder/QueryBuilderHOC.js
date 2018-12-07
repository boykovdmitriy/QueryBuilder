import Vue from 'vue'
import { QueryBuilder } from '../../queryBuilder'

const queryBuilderHOC = (component) => {
  const inheritedProps = component.props || []
  const queryBuilder = new QueryBuilder(inheritedProps.config)
  return Vue.component('QueryBuilderHOC', {
    render (createElement) {
      return createElement(component, {
        props: {
          ...inheritedProps,
          tree: this.tree,
          onNodeChanged: this.handleNodeChanged,
          onNodeRemove: this.handleNodeRemove,
          onRuleAdded: this.handleRuleAdded,
          onGroupAdded: this.handleGroupAdded,
          isRoot: true,
        },
      })
    },
    data: function() {
      return {
        tree: {}
      }
    },
    methods: {
      handleNodeChanged: function (id, newNode) {
        console.log(newNode);
        queryBuilder.changeNode(id, newNode)
        console.log(queryBuilder.getObjectTree())
        this.handleTreeChanged()
      },
      handleNodeRemove: function (id) {
        queryBuilder.removeNode(id)
        this.handleTreeChanged()
      },
      handleGroupAdded: function (id) {
        queryBuilder.addGroup(id)
        this.handleTreeChanged()
      },
      handleRuleAdded: function (id) {
        queryBuilder.addNode(id)
        this.handleTreeChanged()
      },
      handleTreeChanged: function () {
        const queryTree = queryBuilder.getObjectTree()
        this.tree = queryTree
        console.log(this.tree)

        this.$emit('onQueryTreeChanged', queryTree)
      },
    },
    mounted: function () {
      this.handleTreeChanged()
    }
  })
}

export default queryBuilderHOC
