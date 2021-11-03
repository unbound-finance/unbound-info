<template>
  <div class="py-4 px-1 w-full flex justify-between">
    <a target="_blank" href="https://unbound.finance">
      <img :src="require('@/assets/logo.svg')" width="28" />
    </a>
    <div class="flex items-center space-x-2">
      <!-- <NetworkSelectMenu /> -->
      <ToggleDarkMode />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>