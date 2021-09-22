<template>
  <div>
    <button class="p-2" @click="isModalOpen = true">⚙️ Settings</button>
    <VueFinalModal v-model="isModalOpen" classes="modal-container" content-class="modal-content">
        <div class="p-3 bg-blue-500 text-white font-medium rounded-t-lg">Settings</div>
      <div class="grid grid-cols-3">
        <div class="col-span-1">left</div>
        <div class="col-span-2">right</div>
      </div>
    </VueFinalModal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data: () => ({
    isModalOpen: false,
  }),
})
</script>

<style>
.modal-container{
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content{
  width: 400px;
  @apply rounded-lg bg-white dark:(bg-gray-700);
}
</style>