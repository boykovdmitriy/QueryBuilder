<template>
    <QueryBuilderGroup
            :tree="queryTree"
            @onNodeChanged="handleNodeChanged"
            @onNodeRemove="handleNodeRemove"
            @onRuleAdded="handleRuleAdded"
            @onGroupAdded="handleGroupAdded"
            :isRoot="true"
    />
</template>

<script>
  import QueryBuilderGroup from './QueryBuilderGroup.vue'
  import { QueryBuilder } from '../../../../shared/queryBuilder'

  export default {
    name: 'QueryBuilder',
    data: function () {
      return {
        queryTree: {}
      }
    },
    props: {
      onQueryTreeChanged: Function,
      config: Object
    },
    methods: {
      handleNodeChanged: function (id, newNode) {
        this.queryBuilder.changeNode(id, newNode)
        this.handleTreeChanged()
      },
      handleNodeRemove: function (id) {
        this.queryBuilder.removeNode(id)
        this.handleTreeChanged()
      },
      handleGroupAdded: function (id) {
        this.queryBuilder.addGroup(id)
        this.handleTreeChanged()
      },
      handleRuleAdded: function (id) {
        this.queryBuilder.addNode(id)
        this.handleTreeChanged()
      },
      handleTreeChanged: function () {
        const queryTree = this.queryBuilder.getObjectTree()
        this.queryTree = queryTree

        this.$emit('onQueryTreeChanged', queryTree)
      },
    },
    components: {
      QueryBuilderGroup
    },
    mounted: function () {
      this.handleTreeChanged()
    },
    created: function () {
      this.queryBuilder = new QueryBuilder(this.config)
    }
  }
</script>
