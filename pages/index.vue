<template>
  <div>
    <div
      class="
        bg-white
        border
        rounded-md
        flex flex-wrap
        bg-opacity-75
        border-gray-200
        w-full
        p-4
        items-center
        dark:bg-gray-900
        dark:border-gray-800
      "
    >
      <div
        class="
          flex flex-col
          border-gray-200
          w-full
          px-4
          md:border-r
          md:w-1/3
          dark:border-gray-800
        "
      >
        <div class="flex flex-col p-2">
          <div class="flex w-full items-center justify-between">
            <span class="text-xs text-gray-500 uppercase dark:text-gray-600"
              >Total uTokens Minted</span
            >
          </div>

          <div
            class="
              flex
              space-x-6
              mt-2
              w-full
              px-2
              transition-all
              ease-in
              duration-150
              items-center
            "
          >
            <div class="flex items-center">
              <img
                src="~/assets/tokens/und.webp"
                class="mr-2"
                width="16"
                alt="UND logo"
              />
              <div class="flex flex-col">
                <div class="font-medium text-gray-800 dark:text-gray-200">
                  <span v-if="!loading">
                    {{
                      $numberFormatter(
                        Number(overview.liquidity.UNDLiquidity),
                        1
                      )
                    }}
                  </span>
                  <span v-else>
                    <content-loader :height="100" :primary-opacity="0.4" />
                  </span>
                </div>
                <span class="text-xs text-gray-500 dark:text-gray-600"
                  >UND</span
                >
              </div>
            </div>

            <div class="flex items-center">
              <!-- <img
                src="~/assets/tokens/uEth.svg"
                class="mr-2"
                alt="uEth logo"
                style="max-height: 20px; max-width: 16px"
              /> -->
              <!-- <div class="flex flex-col">
                <div class="font-medium text-gray-800 dark:text-gray-200">
                  <span v-if="!loading.overview.liquidity.uETHLiquidity">
                    {{
                      $numberFormatter(
                        Number(overview.liquidity.uETHLiquidity),
                        1
                      )
                    }}
                  </span>
                  <span v-else>
                    <content-loader :height="100" :primary-opacity="0.4" />
                  </span>
                </div>
                <span class="text-xs text-gray-500 dark:text-gray-600"
                  >uETH</span
                >
              </div> -->
            </div>
          </div>
        </div>
        <div
          class="border-b border-gray-200 my-2 -mx-2 dark:border-gray-800"
        ></div>
        <div class="flex flex-col p-2">
          <span class="text-xs text-gray-500 uppercase dark:text-gray-600"
            >Total Value Locked</span
          >
          <div
            class="font-medium text-xl text-gray-800 dark:text-gray-200"
            :title="overview.tvl.toLocaleString()"
          >
            <span v-if="!loading">
              ${{ $numberFormatter(Number(overview.tvl), 1) }}
            </span>
            <span v-else>
              <content-loader :height="15" :primary-opacity="0.4" />
            </span>
          </div>
        </div>
      </div>

      <div
        class="
          flex flex-col
          border-gray-200
          w-full
          px-4
          md:border-r
          md:w-1/3
          dark:border-gray-800
        "
      >
        <div class="flex w-full items-center justify-between">
          <!-- <div class="flex flex-col p-2">
            <span class="text-xs text-gray-500 uppercase dark:text-gray-600"
              >24H Volume</span
            >
            <div
              class="font-medium text-xl text-gray-800 dark:text-gray-200"
              :title="overview.dailyVolume.toLocaleString()"
            >
              <span v-if="!loading">
                ${{ $numberFormatter(overview.dailyVolume) }}
              </span>
              <span v-else>
                <content-loader :height="40" :primary-opacity="0.4" />
              </span>
            </div>
          </div> -->

          <div class="flex flex-col p-2">
            <span class="text-xs text-gray-500 uppercase dark:text-gray-600"
              >Total Volume</span
            >
            <div
              class="font-medium text-xl text-gray-800 dark:text-gray-200"
              :title="overview.totalVolume.toLocaleString()"
            >
              <span v-if="!loading">
                ${{ $numberFormatter(overview.totalVolume) }}
              </span>
              <span v-else>
                <content-loader :height="40" :primary-opacity="0.4" />
              </span>
            </div>
          </div>
        </div>

        <div
          class="border-b border-gray-200 my-2 -mx-2 dark:border-gray-800"
        ></div>
        <div class="flex flex-col p-2">
          <span class="text-xs text-gray-500 uppercase dark:text-gray-600"
            >Collatralization Ratio</span
          >
          <div class="font-medium text-xl text-gray-800 dark:text-gray-200">
            <span v-if="!loading"> {{ overview.cRatio }}% </span>
            <span v-else>
              <content-loader :height="15" :primary-opacity="0.4" />
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex-col w-full px-4 md:w-1/3">
        <div class="flex w-full px-2 items-center justify-between">
          <span class="text-xs text-gray-500 uppercase dark:text-gray-600"
            >Current Fees Pool</span
          >
          <button
            type="button"
            class="
              text-xs text-light-primary
              dark:text-dark-primary
              appearance-none
              focus:outline-none
            "
            @click="ui.showFeesBreakdown = !ui.showFeesBreakdown"
          >
            <span v-if="!ui.showFeesBreakdown">View Details</span>
            <i v-else class="text-xs fas fa-times"></i>
          </button>
        </div>

        <div
          v-if="ui.showFeesBreakdown"
          class="
            flex
            mt-4
            w-full
            px-2
            transition-all
            ease-in
            duration-150
            items-center
            justify-between
          "
        >
          <div class="flex flex-col items-center justify-center">
            <div class="font-medium text-lg text-gray-800 dark:text-gray-200">
              <span v-if="!loading"> ${{ Number(fees.staking) }} </span>
              <span class="text-xs" v-else> Loading... </span>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-600"
              >Staker Fees</span
            >
          </div>

          <div class="flex flex-col items-center justify-center">
            <div class="font-medium text-lg text-gray-800 dark:text-gray-200">
              <span v-if="!loading"> ${{ Number(fees.safu) }} </span>
              <span class="text-xs" v-else> Loading... </span>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-600"
              >SAFU Fund</span
            >
          </div>

          <div class="flex flex-col items-center justify-center">
            <div class="font-medium text-lg text-gray-800 dark:text-gray-200">
              <span v-if="!loading"> ${{ Number(fees.devfund) }} </span>
              <span class="text-xs" v-else> Loading... </span>
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-600"
              >Dev Fund</span
            >
          </div>
        </div>

        <div v-else class="px-2 transition-all ease-in duration-150">
          <div class="font-medium text-2xl text-gray-800 dark:text-gray-200">
            <span v-if="!loading">
              ${{
                (
                  Number(fees.staking) +
                  Number(fees.safu) +
                  Number(fees.devfund)
                ).toLocaleString()
              }}
            </span>
            <span v-else>
              <content-loader :height="15" :primary-opacity="0.4" />
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 
    <div class="cursor-pointer mt-1 ml-2 w-auto inline-block">
      <span class="text-xs dark:text-white hover:border-b" @click="initOnMount"
        >Refresh All</span
      >
    </div> -->

    <div class="mt-4 md:mt-8">
      <div class="flex w-full py-2 items-center justify-between">
        <p class="font-medium text-lg p-2 text-gray-800 dark:text-gray-200">
          Vaults
        </p>

        <input
          v-model="search"
          type="text"
          class="
            border
            rounded-lg
            border-gray-200
            text-sm
            py-2
            px-4
            focus:border-light-primary
            appearance-none
            focus:outline-none
            md:w-1/3
            dark:border-gray-800
            dark:bg-gray-900
            dark:text-gray-500
          "
          placeholder="Search vault, token or address..."
        />
      </div>
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="min-w-full py-2 align-middle inline-block sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden sm:rounded-lg">
            <table
              class="divide-y min-w-full divide-gray-200 dark:(divide-gray-800)"
            >
              <thead>
                <tr class="bg-white dark:bg-gray-900">
                  <th
                    class="
                      font-medium
                      bg-gray-50
                      text-left text-xs
                      tracking-wider
                      py-3
                      px-6
                      text-gray-500
                      leading-4
                      uppercase
                      dark:bg-gray-900
                    "
                  >
                    Vault
                  </th>

                  <th
                    class="
                      font-medium
                      bg-gray-50
                      text-left text-xs
                      tracking-wider
                      py-3
                      px-6
                      text-gray-500
                      leading-4
                      uppercase
                      dark:bg-gray-900
                    "
                    title="Unbound Total Value Locked"
                  >
                    Unbound TVL
                  </th>
                  <th
                    class="
                      font-medium
                      bg-gray-50
                      text-left text-xs
                      tracking-wider
                      py-3
                      px-6
                      text-gray-500
                      leading-4
                      uppercase
                      dark:bg-gray-900
                    "
                    title="Unbound Total Value Locked"
                  >
                    Volume
                  </th>
                  <th
                    class="
                      font-medium
                      bg-gray-50
                      text-left text-xs
                      tracking-wider
                      py-3
                      px-6
                      text-gray-500
                      leading-4
                      uppercase
                      dark:bg-gray-900
                    "
                  >
                    Loan to Value
                  </th>
                  <th
                    class="
                      font-medium
                      bg-gray-50
                      text-left text-xs
                      tracking-wider
                      py-3
                      px-6
                      text-gray-500
                      leading-4
                      uppercase
                      dark:bg-gray-900
                    "
                  >
                    CR
                  </th>
                  <th
                    class="
                      font-medium
                      bg-gray-50
                      text-left text-xs
                      tracking-wider
                      py-3
                      px-6
                      text-gray-500
                      leading-4
                      uppercase
                      dark:bg-gray-900
                    "
                  >
                    Minting Fee
                  </th>
                  <th
                    class="
                      font-medium
                      bg-gray-50
                      text-left text-xs
                      tracking-wider
                      py-3
                      px-6
                      text-gray-500
                      leading-4
                      uppercase
                      dark:bg-gray-900
                    "
                  >
                    Limit
                  </th>
                  <th class="bg-gray-50 py-3 px-6 dark:bg-gray-900"></th>
                </tr>
              </thead>
              <tbody
                v-if="!loading && searchResult && searchResult.length != 0"
                class="bg-white bg-opacity-75 dark:bg-gray-900"
              >
                <tr v-for="(data, i) in searchResult" :key="i">
                  <td class="py-4 px-6 whitespace-no-wrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-8 w-8 mt-2">
                        <double-logo
                          :token0="getIconUrl(data.token0.symbol)"
                          :token1="getIconUrl(data.token1.symbol)"
                        />
                      </div>
                      <div class="ml-4">
                        <div
                          class="
                            font-medium
                            text-sm text-gray-900
                            leading-5
                            dark:text-gray-200
                          "
                        >
                          {{ data.token0.symbol }} - {{ data.token1.symbol }}
                        </div>
                        <div
                          class="
                            text-xs text-gray-500
                            leading-5
                            dark:text-gray-700
                          "
                        >
                          {{ data.id }}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td class="py-4 px-6 whitespace-no-wrap">
                    <div
                      class="text-sm text-gray-900 leading-5 dark:text-gray-200"
                      :title="data.tvl.toLocaleString()"
                    >
                      {{ $numberFormatter(data.tvl, 1) }}
                    </div>
                  </td>
                  <td class="py-4 px-6 whitespace-no-wrap">
                    <div
                      class="text-sm text-gray-900 leading-5 dark:text-gray-200"
                      :title="data.volume.toLocaleString()"
                    >
                      {{ $numberFormatter(data.volume, 1) }}
                    </div>
                  </td>
                  <td class="py-4 px-6 whitespace-no-wrap">
                    <div
                      class="text-sm text-gray-900 leading-5 dark:text-gray-200"
                    >
                      {{ data.LTV / 1e6 }}%
                    </div>
                  </td>
                  <td class="py-4 px-6 whitespace-no-wrap">
                    <div
                      class="text-sm text-gray-900 leading-5 dark:text-gray-200"
                    >
                      {{ data.cr / 1e6 }}%
                    </div>
                  </td>
                  <td class="py-4 px-6 whitespace-no-wrap">
                    <div
                      class="text-sm text-gray-900 leading-5 dark:text-gray-200"
                    >
                      {{ data.fee }}%
                    </div>
                  </td>
                  <td class="py-4 px-6 whitespace-no-wrap">
                    <div
                      class="text-sm text-gray-900 leading-5 dark:text-gray-200"
                    >
                      {{ data.limit }}
                    </div>
                  </td>
                </tr>
              </tbody>

              <tbody
                v-else-if="!searchResult"
                class="bg-white dark:bg-gray-900"
              >
                <tr>
                  <td class="py-4 px-6 whitespace-no-wrap">
                    <content-loader
                      :height="100"
                      :primary-opacity="0.25"
                    ></content-loader>
                  </td>
                  <td class="py-4 px-6 whitespace-no-wrap">
                    <content-loader
                      :height="48"
                      :primary-opacity="0.25"
                    ></content-loader>
                  </td>
                  <td class="py-4 px-6 whitespace-no-wrap">
                    <content-loader
                      :height="32"
                      :primary-opacity="0.25"
                    ></content-loader>
                  </td>
                  <td class="py-4 px-6 whitespace-no-wrap">
                    <content-loader
                      :height="48"
                      :primary-opacity="0.25"
                    ></content-loader>
                  </td>
                  <td class="py-4 px-6 whitespace-no-wrap">
                    <content-loader
                      :height="48"
                      :primary-opacity="0.25"
                    ></content-loader>
                  </td>
                  <td class="py-4 px-6 whitespace-no-wrap"></td>
                </tr>
              </tbody>

              <tbody v-else>
                <tr class="bg-white dark:bg-gray-900">
                  <td colspan="6">
                    <div class="text-sm text-center p-4 text-gray-600">
                      Token Not found.
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- This hidden div is just so that WindiCSS imports these dynamic colors -->
    <div class="hidden bg-cyan-500 bg-yellow-400"></div>
  </div>
</template>

<script>
import Vue from 'vue'
// @ts-ignore
import { ContentLoader } from 'vue-content-loader'

import mainQuery from '~/graphql/queries/main.gql'
import { getIconUrl } from '~/utils/icons'

export default Vue.extend({
  components: {
    ContentLoader,
  },
  data() {
    return {
      ui: {
        showFeesBreakdown: false,
        showLiquidityBreakdown: false,
      },
      vaults: null,
      search: '',
      overview: {
        liquidity: {
          total: 0,
          UNDLiquidity: 0,
          uETHLiquidity: 0,
        },
        dailyVolume: 0,
        totalVolume: 0,
        cRatio: 0,
        tvl: 0,
      },
      fees: {
        staking: '',
        devfund: '',
        safu: '',
      },
      loading: false,
    }
  },
  computed: {
    searchResult() {
      const search = this.search.trim()
      if (search) {
        const regex = new RegExp(search, 'ig')
        const result = this.vaults.filter(
          ({ id, token0, token1 }) =>
            regex.test(id) ||
            (search.slice(0, 2).toLowerCase() === '0x' && regex.test(id)) ||
            regex.test(token0.symbol) ||
            regex.test(token0.name) ||
            regex.test(token1.symbol) ||
            regex.test(token1.name)
        )
        return result
      }
      return this.vaults
    },
  },
  mounted() {
    this.queryAllData()

    this.$root.$on('networkChanged', this.queryAllData)
  },
  beforeDestroy() {
    this.$root.$off('networkChanged', this.queryAllData)
  },
  methods: {
    getIconUrl(args) {
      return getIconUrl(...args)
    },
    async queryAllData() {
      try {
        this.loading = true
        const { data } = await this.$apollo.query({
          client: this.$store.state.selectedNetwork || 'mainnet',
          query: mainQuery,
        })
        this.vaults = data.vaults.map((vault) => ({
          ...vault,
          volume: +vault.volume / 1e18,
          tvl: +vault.tvl / 1e18
        }))

        this.overview.liquidity.UNDLiquidity = data.factories[0].undMinted

        this.calculateOverview()
        this.loading = false
      } catch (e) {
        console.error(e)
        this.loading = false
      }
    },
    /**
     * Calculate Overview values from the table
     */
    calculateOverview() {
      this.overview.totalVolume = 0
      this.overview.tvl = 0
      this.overview.cRatio = 0
      // Loop through all vaults
      const LPTPrice = 1 // Get from subgraph (which may use Oracle itself)
      this.vaults.forEach((vault) => {
        this.overview.totalVolume += +vault.volume * LPTPrice
        this.overview.tvl += +vault.tvl * LPTPrice
      })

      // Temporary
      this.overview.cRatio = this.vaults[0].cr / 1e6
    },
  },
})
</script>

<style></style>
