
export const state = () => ({
    selectedNetwork: null
})

export const mutations = {
    setSelectedNetwork(state, payload){
        state.selectedNetwork = payload.name.toLowerCase()
    }
}
