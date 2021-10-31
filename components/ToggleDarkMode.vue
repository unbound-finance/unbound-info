<template>
  <button
    class="
      w-9
      h-9
      flex
      items-center
      justify-center
      rounded-full
      border
      border-gray-200
      bg-gray-50
      dark:(bg-gray-700 border-gray-900)
      focus:outline-none
    "
    @click="toggleMode"
  >
    <img
      :src="
        require(`~/assets/icons/${
          this.$colorMode.value === 'light' ? 'moon' : 'sun'
        }.svg`)
      "
      width="13"
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
