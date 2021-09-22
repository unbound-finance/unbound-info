<template>
  <div>
    <button class="p-2" @click="isModalOpen = true">⚙️ Settings</button>
    <VueFinalModal v-model="isModalOpen" classes="modal-container" content-class="modal-content">
        <div class="p-3 bg-light-primary text-white font-medium rounded-t-lg">Settings</div>
      <div class="grid grid-cols-3">
        <div class="col-span-1">
          <h2 class="bg-true-gray-200 text-true-gray-500 text-center text-sm py-1 border-r border-true-gray-400">Networks</h2>
          <div class="my-2">
            <div v-for="network in networks" :key="network" class="list-item">{{network}}</div>
          </div>
        </div>
        <div class="col-span-2">
          <h2 class="bg-true-gray-200 text-true-gray-500 text-center text-sm py-1">Vaults</h2>
        </div>
      </div>
    </VueFinalModal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import nuxtConfig from '../nuxt.config'

export default Vue.extend({
  data: () => ({
    isModalOpen: false,
    networks: [] as string[]
  }),
  mounted(){
    this.networks = Object.keys(nuxtConfig.apollo.clientConfigs)
  }
})
</script>

<style>
.modal-container{
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins';
}
.modal-content{
  width: 500px;
  @apply rounded-lg bg-white dark:(bg-gray-700);
}
.list-item{
  @apply ml-2 px-3 py-2 cursor-pointer rounded-lg hover:(bg-true-gray-300);
}
/* .list-item-active{

} */
</style>