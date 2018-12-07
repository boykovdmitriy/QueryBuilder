<template>
    <select
            @change="handleOnChange"
            :value="selectedOption"
    >
        <option
                v-for="option in options"
                :key="option"
                :value="option"
        >
            {{option}}
        </option>
    </select>
</template>

<script>
  import Vue from 'vue'

  export default Vue.component('Select', {
    name: 'Select',
    props: {
      options: Array,
      onChange: Function,
      selectedOption: String,
    },
    methods: {
      handleOnChange: function ({target: {value}}) {
        this.$emit('onChange', value)
      },
    },
  })
</script>