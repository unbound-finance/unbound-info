<template>
  <button
    class="
      w-8
      h-8
      flex
      items-center
      justify-center
      rounded
      bg-gray-50
      dark:bg-gray-700
      focus:outline-none
    "
    @click="toggleMode"
  >
    <img
      class="text-light-primary"
      :src="
        require(`~/assets/icons/${
          this.$colorMode.value === 'light' ? 'moon' : 'sun'
        }.svg`)
      "
      width="12"
      alt="mode"
    />
  </button>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  methods: {
    toggleMode() {
      this.$colorMode.preference =
        this.$colorMode.value === 'light' ? 'dark' : 'light'
    },
  },
})
</script>
