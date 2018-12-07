<template>
    <div id="app">
        <section>
            <QueryBuilder
                    @onQueryTreeChanged="handleTreeChanged"
            />
        </section>
        <section>
            {{JSON.stringify(tree)}}
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
    }
  }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
