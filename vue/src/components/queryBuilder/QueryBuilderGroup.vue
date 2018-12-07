<template>
    <section class="query-builder-rule">
        <section>
            <Select
                    :options="allowedCombinators"
                    @onChange="handleCombinatorChanged"
                    :selectedOption="tree.combinator"
            />
            <Button @onClick="handleRuleAdded">+Rule</Button>
            <Button @onClick="handleGroupAdded">+Group</Button>
            <Button v-if="!isRoot" @onClick="handleNodeRemove">x</Button>
        </section>
        <section>
            <section v-for="rule in tree.rules">
                <template v-if="!rule.rules">
                    <QueryBuilderRule
                            :key="rule.id"
                            :rule="rule"
                            @onNodeChanged="handleNodeChanged"
                            @onNodeRemove="handleNodeRemove"
                    />
                </template>
                <template v-if="rule.rules">
                    <QueryBuilderGroup
                            :key="rule.id"
                            :tree="rule"
                            @onNodeRemove="handleNodeRemove"
                            @onNodeChanged="handleNodeChanged"
                            @onGroupAdded="handleGroupAdded"
                            @onRuleAdded="handleRuleAdded"
                    />
                </template>
            </section>
        </section>
    </section>
</template>

<script>
  import { ALLOWED_QUERY_COMBINATORS } from '../../queryBuilder'
  import Select from '../select/Select.vue'
  import Button from '../button/Button.vue'
  import QueryBuilderRule from './QueryBuilderRule.vue'

  export default {
    name: 'QueryBuilderGroup',
    props: {
      tree: Object,
      onNodeRemove: Function,
      onNodeChanged: Function,
      onGroupAdded: Function,
      onRuleAdded: Function,
      isRoot: Boolean
    },
    data: function () {
      return {
        allowedCombinators: ALLOWED_QUERY_COMBINATORS,
      }
    },
    methods: {
      handleCombinatorChanged: function (value) {
        const {tree} = this
        this.$emit('onNodeChanged', tree.id, {
          ...tree,
          combinator: value
        })
      },
      handleNodeChanged: function (id, newNode) {
        this.$emit('onNodeChanged', id, newNode)
      },
      handleRuleAdded: function (id) {
        const {tree} = this
        if (!id) {
          this.$emit('onRuleAdded', tree.id)
        } else {
          this.$emit('onRuleAdded', id)
        }
      },
      handleNodeRemove: function (id) {
        const {tree} = this
        if (!id) {
          this.$emit('onNodeRemove', tree.id)
        } else {
          this.$emit('onNodeRemove', id)
        }
      },
      handleGroupAdded: function (id) {
        const {tree} = this
        if (!id) {
          this.$emit('onGroupAdded', tree.id)
        } else {
          this.$emit('onGroupAdded', id)
        }
      },
    },
    components: {
      QueryBuilderRule
    }
  }
</script>