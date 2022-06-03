<template>
  <div v-if="options && selected" v-click-outside="close">
    <div class="relative font-poppins">
      <button
        type="button"
        class="
          relative
          w-40
          bg-white
          border border-gray-300
          rounded-lg
          shadow-sm
          pl-3
          pr-12
          py-2
          text-left
          cursor-pointer
          focus:(outline-none
          ring)
          sm:text-sm
          dark:(bg-gray-900
          text-gray-100
          border-gray-700)
        "
        @click="open = !open"
        aria-haspopup="listbox"
        aria-expanded="true"
        aria-labelledby="listbox-label"
      >
        <span class="flex items-center">
          <NetworkCircle :network="selected" />
          <span class="ml-3 block truncate"> {{ selected.replace(selected[0], selected[0].toUpperCase()) }} </span>
        </span>
        <span
          class="
            ml-3
            absolute
            inset-y-0
            right-0
            flex
            items-center
            pr-2
            pointer-events-none
          "
        >
          <!-- Heroicon name: solid/selector -->
          <svg
            class="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </button>

      <!--
      Select popover, show/hide based on select state.

      Entering: ""
        From: ""
        To: ""
      Leaving: "transition ease-in duration-100"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <transition
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ul
          v-show="open"
          class="
            absolute
            z-10
            mt-1
            w-full
            bg-white
            shadow-lg
            max-h-56
            rounded-lg
            p-1
            text-base
            ring-1 ring-black ring-opacity-5
            overflow-auto
            focus:outline-none
            sm:text-sm
            dark:(bg-gray-700)
          "
          tabindex="-1"
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          <h2 class="text-sm p-2 text-true-gray-500 dark:(text-gray-400)">
            Select Network
          </h2>
          <!--
        Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

        Highlighted: "text-white bg-light-primary", Not Highlighted: "text-gray-900"
      -->
          <li
            class="
              cursor-pointer
              select-none
              relative
              py-2
              pl-3
              pr-9
              my-0.5
              rounded-lg
            "
            id="listbox-option-0"
            role="option"
            v-for="(option, i) in options"
            :key="i"
            :value="option"
            @mouseenter="onMouseEnter(option)"
            @mouseleave="onMouseLeave(option)"
            :class="[
              hoverState === option
                ? 'bg-true-gray-200 dark:(bg-gray-500 text-white)'
                : 'text-gray-900 dark:text-white',
            ]"
            @click="select(option)"
          >
            <div class="flex items-center">
              <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
              <NetworkCircle :network="option" />
              <span
                class="ml-3 block truncate"
                :class="selected === option ? 'font-semibold' : 'font-normal'"
              >
                {{ option.replace(option[0], option[0].toUpperCase()) }}
              </span>
            </div>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
import nuxtConfig from '~/nuxt.config'

export default {
  data: () => ({
    options: [],
    selected: null,
    open: false,
    hoverState: null,
  }),
  mounted() {
    this.options = Object.keys(nuxtConfig.apollo.clientConfigs)
    this.select(this.options[0])
  },
  methods: {
    select(option) {
      if (this.selected === option) {
        this.close()
        return
      }
      this.selected = option
      this.close()
      this.$store.commit('setSelectedNetwork', option)
      this.$root.$emit('networkChanged')
    },
    onMouseEnter(option) {
      this.hoverState = option
    },
    onMouseLeave(option) {
      if (this.hoverState === option) this.hoverState = null
    },
    close() {
      this.open = false
    },
  },
}
</script>

<style></style>
