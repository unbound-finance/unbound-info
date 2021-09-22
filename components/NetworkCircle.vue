<template>
    <div class="w-4 h-4 rounded-full" :class="color"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import { NETWORK_COLORS } from '~/constants'
export default Vue.extend({
    props:{
        network:{
            type: String,
            default: 'mainnet'
        }
    },
    computed:{
        color(){
            // @ts-ignore
            return NETWORK_COLORS[this.network]
        }
    }
})
</script>
