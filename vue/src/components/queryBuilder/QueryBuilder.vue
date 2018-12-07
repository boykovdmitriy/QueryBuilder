<template>
    <section>
        <QueryBuilderGroup
                @onQueryTreeChanged="handleQueryTreeChanged"
        />
        <section>{{JSON.stringify(queryTree)}}</section>
    </section>
</template>

<script>
  import QueryBuilderGroup from './QueryBuilderGroup.vue'
  import QueryBuilderHOC from './QueryBuilderHOC'

  const wrappedQueryBuilder = QueryBuilderHOC(QueryBuilderGroup)

  export default {
    name: 'QueryBuilder',
    data: function () {
      return {
        queryTree: {}
      }
    },
    methods: {
      handleQueryTreeChanged: function (tree) {
        this.queryTree = tree
      },
    },
    components: {
      QueryBuilderGroup: wrappedQueryBuilder
    }
  }
</script>
