<template>
    <section class="query-builder-rule">
        <Select
                :options="allowedFields"
                @onChange="handleFieldChanged"
                :selectedOption="rule.field"
        />
        <Select
                :options="allowedOperators"
                @onChange="handleOperatorChanged"
                :selectedOption="rule.operator"
        />
        <input
                type="text"
                :value="rule.value"
                @input="handleValueChanged"
        />
        <Button @onClick="handleNodeRemove">x</Button>
    </section>
</template>

<script>
  import { ALLOWED_QUERY_FIELDS, ALLOWED_QUERY_OPERATORS } from '../../queryBuilder'
  import Select from '../select/Select.vue'
  import Button from '../button/Button.vue'

  export default {
    name: 'QueryBuilderRule',
    props: {
      rule: Object,
      onNodeRemove: Function,
      onNodeChanged: Function,
    },
    data: function () {
      return {
        allowedFields: ALLOWED_QUERY_FIELDS,
        allowedOperators: ALLOWED_QUERY_OPERATORS,
      }
    },
    methods: {
      handleFieldChanged: function (value) {
        const {rule}  = this;
        this.$emit('onNodeChanged', rule.id, {
          ...rule,
          field: value,
        })
      },
      handleNodeRemove: function () {
        const {rule: {id}} = this
        this.$emit('onNodeRemove', id)
      },
      handleOperatorChanged: function (value) {
        const {rule}  = this;
        this.$emit('onNodeChanged', rule.id,{
          ...rule,
          operator: value,
        })
      },
      handleValueChanged: function ({target: {value}}) {
        const {rule}  = this;
        this.$emit('onNodeChanged', rule.id, {
          ...rule,
          value,
        })
      },
    }
  }
</script>