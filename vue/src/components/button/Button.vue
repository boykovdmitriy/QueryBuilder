<template>
    <button
            @click="handleOnClick"
    >
        <slot></slot>
    </button>
</template>

<script>
  import Vue from 'vue'

  export default Vue.component('Button', {
    name: 'Button',
    props: {
      onClick: Function,
    },
    methods: {
      handleOnClick: function () {
        this.$emit('onClick')
      }
    }
  })
</script>