<template>
    <div
            id="app"
            class="app"
    >
        <section class="app__query-builder">
            <QueryBuilder
                    @onQueryTreeChanged="handleTreeChanged"
            />
        </section>
        <section class="app__query-tree">
            <pre>
               {{tree | pretty}}
            </pre>
        </section>
    </div>
</template>

<script>
  import QueryBuilder from './components/queryBuilder/QueryBuilder'

  export default {
    name: 'app',
    data: function () {
      return {
        tree: {}
      }
    },
    components: {
      QueryBuilder
    },
    methods: {
      handleTreeChanged: function (tree) {
        this.tree = tree
      }
    },
    filters: {
      pretty: function(value) {
        return JSON.stringify(value, null, 2);
      }
    }
  }
</script>

<style scoped>
    .app {
        display: flex;
        flex-direction: row;
    }

    .app__query-tree,
    .app__query-builder {
        width: 49%;
    }
    .app__query-builder {
        padding-left: 1rem;
    }

</style>
