<template>
  <div>
    <div
      class="w-full p-4 rounded-md bg-white dark:bg-gray-900 bg-opacity-75 border border-gray-200 dark:border-gray-800 flex flex-wrap items-center"
    >
      <div
        class="flex flex-col w-full md:w-1/3 md:border-r border-gray-200 dark:border-gray-800 px-4"
      >
        <div class="p-2 flex flex-col">
          <div class="w-full flex items-center justify-between">
            <span class="text-xs text-gray-500 dark:text-gray-600 uppercase"
              >Total uTokens Minted</span
            >
          </div>

          <div
            class="w-full px-2 flex items-center space-x-6 mt-2 transition-all ease-in duration-150"
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
                  {{
                    $numberFormatter(Number(overview.liquidity.UNDLiquidity), 1)
                  }}
                </div>
                <span class="text-xs text-gray-500 dark:text-gray-600"
                  >UND</span
                >
              </div>
            </div>

            <div class="flex items-center">
              <img
                src="~/assets/tokens/uEth.svg"
                class="mr-2"
                alt="uEth logo"
                style="max-height: 20px; max-width: 16px"
              />
              <div class="flex flex-col">
                <div class="font-medium text-gray-800 dark:text-gray-200">
                  {{
                    $numberFormatter(
                      Number(overview.liquidity.uETHLiquidity),
                      1
                    )
                  }}
                </div>
                <span class="text-xs text-gray-500 dark:text-gray-600"
                  >uETH</span
                >
              </div>
            </div>
          </div>
        </div>
        <div
          class="border-b border-gray-200 dark:border-gray-800 my-2 -mx-2"
        ></div>
        <div class="p-2 flex flex-col">
          <span class="text-xs text-gray-500 dark:text-gray-600 uppercase"
            >Total Value Locked</span
          >
          <div
            class="font-medium text-gray-800 dark:text-gray-200 text-xl"
            :title="overview.tvl.toLocaleString()"
          >
            ${{ $numberFormatter(Number(overview.tvl), 1) }}
          </div>
        </div>
      </div>

      <div
        class="flex flex-col w-full md:w-1/3 md:border-r border-gray-200 dark:border-gray-800 px-4"
      >
        <div class="flex items-center justify-between w-full">
          <div class="p-2 flex flex-col">
            <span class="text-xs text-gray-500 dark:text-gray-600 uppercase"
              >24H Volume</span
            >
            <div
              class="font-medium text-gray-800 dark:text-gray-200 text-xl"
              :title="overview.dailyVolume.toLocaleString()"
            >
              ${{ $numberFormatter(overview.dailyVolume) }}
            </div>
          </div>

          <div class="p-2 flex flex-col">
            <span class="text-xs text-gray-500 dark:text-gray-600 uppercase"
              >Total Volume</span
            >
            <div
              class="font-medium text-gray-800 dark:text-gray-200 text-xl"
              :title="overview.totalVolume.toLocaleString()"
            >
              ${{ $numberFormatter(overview.totalVolume) }}
            </div>
          </div>
        </div>

        <div
          class="border-b border-gray-200 dark:border-gray-800 my-2 -mx-2"
        ></div>
        <div class="p-2 flex flex-col">
          <span class="text-xs text-gray-500 dark:text-gray-600 uppercase"
            >Collatralization Ratio</span
          >
          <div class="font-medium text-gray-800 dark:text-gray-200 text-xl">
            {{ overview.cRatio }}%
          </div>
        </div>
      </div>

      <div class="flex flex-col w-full md:w-1/3 px-4">
        <div class="px-2 w-full flex items-center justify-between">
          <span class="text-xs text-gray-500 dark:text-gray-600 uppercase"
            >Current Fees Pool</span
          >
          <button
            type="button"
            class="text-xs text-light-primary dark:text-dark-primary appearance-none focus:outline-none"
            @click="ui.showFeesBreakdown = !ui.showFeesBreakdown"
          >
            <span v-if="!ui.showFeesBreakdown">View Details</span>
            <i v-else class="fas fa-times text-xs"></i>
          </button>
        </div>

        <div
          v-if="ui.showFeesBreakdown"
          class="w-full px-2 flex items-center justify-between mt-4 transition-all ease-in duration-150"
        >
          <div class="flex flex-col items-center justify-center">
            <div class="text-lg font-medium text-gray-800 dark:text-gray-200">
              ${{ Number(fees.staking) }}
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-600"
              >Staker Fees</span
            >
          </div>

          <div class="flex flex-col items-center justify-center">
            <div class="text-lg font-medium text-gray-800 dark:text-gray-200">
              ${{ Number(fees.safu) }}
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-600"
              >SAFU Fund</span
            >
          </div>

          <div class="flex flex-col items-center justify-center">
            <div class="text-lg font-medium text-gray-800 dark:text-gray-200">
              ${{ Number(fees.devfund) }}
            </div>
            <span class="text-xs text-gray-500 dark:text-gray-600"
              >Dev Fund</span
            >
          </div>
        </div>

        <div v-else class="px-2 transition-all ease-in duration-150">
          <div class="text-2xl font-medium text-gray-800 dark:text-gray-200">
            ${{
              (
                Number(fees.staking) +
                Number(fees.safu) +
                Number(fees.devfund)
              ).toLocaleString()
            }}
          </div>
        </div>
      </div>
    </div>

    <div class="ml-2 mt-1 w-auto inline-block cursor-pointer">
      <span class="text-xs dark:text-white hover:border-b" @click="initOnMount"
        >Refresh All</span
      >
    </div>

    <div class="mt-4 md:mt-8">
      <div class="w-full flex items-center justify-between py-2">
        <p class="text-lg text-gray-800 dark:text-gray-200 font-medium p-2">
          Liquidity Pool Tokens
        </p>

        <input
          v-model="search"
          type="text"
          class="px-4 py-2 md:w-1/3 border border-gray-200 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-500 focus:border-light-primary text-sm rounded-lg appearance-none focus:outline-none"
          placeholder="Search token, address or exchange..."
        />
      </div>
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden sm:rounded-lg">
            <table class="min-w-full divide-y divide-gray-200">
              <thead>
                <tr class="bg-white dark:bg-gray-900">
                  <th
                    class="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>

                  <th
                    class="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                    title="Unbound Total Value Locked"
                  >
                    Unbound TVL
                  </th>
                  <th
                    class="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                    title="Uniswap Total Value Locked"
                  >
                    Uniswap TVL
                  </th>
                  <th
                    class="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Funding Rate
                  </th>
                  <th
                    class="px-6 py-3 bg-gray-50 dark:bg-gray-900 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Minting Fee
                  </th>
                  <th class="px-6 py-3 bg-gray-50 dark:bg-gray-900"></th>
                </tr>
              </thead>
              <tbody
                v-if="searchResult && searchResult.length != 0"
                class="bg-white bg-opacity-75 dark:bg-gray-900"
              >
                <tr v-for="(data, i) in searchResult" :key="i">
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 h-8 w-8">
                        <double-logo
                          :token0logo="data.currencyOneLogo"
                          :token1logo="data.currencyTwoLogo"
                        />
                      </div>
                      <div class="ml-4">
                        <div
                          class="text-sm leading-5 font-medium text-gray-900 dark:text-gray-200"
                        >
                          {{ data.name }}
                        </div>
                        <div
                          class="text-sm leading-5 text-gray-500 dark:text-gray-700"
                        >
                          {{ data.exchange }}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td class="px-6 py-4 whitespace-no-wrap">
                    <div
                      class="text-sm leading-5 text-gray-900 dark:text-gray-200"
                      :title="data.tvl.toLocaleString()"
                    >
                      {{ $numberFormatter(data.tvl, 1) }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <div
                      class="text-sm leading-5 text-gray-900 dark:text-gray-200"
                      :title="data.uniswapTvl.toLocaleString()"
                    >
                      {{ $numberFormatter(data.uniswapTvl, 1) }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <div
                      class="text-sm leading-5 text-gray-900 dark:text-gray-200"
                    >
                      {{ data.ltv }}%
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <div
                      class="text-sm leading-5 text-gray-900 dark:text-gray-200"
                    >
                      {{ Number((data.mintingFee / 1e6) * 100) }}%
                    </div>
                  </td>
                  <td
                    class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium"
                  >
                    <nuxt-link to="/mint">
                      <button
                        type="button"
                        class="bg-light-primary dark:bg-dark-primary text-light-primary dark:text-white bg-opacity-25 px-6 py-1 rounded appearance-none focus:outline-none"
                      >
                        Mint
                      </button>
                    </nuxt-link>
                  </td>
                </tr>
              </tbody>

              <tbody
                v-else-if="!searchResult"
                class="bg-white dark:bg-gray-900"
              >
                <tr>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <content-loader
                      :height="100"
                      :primary-opacity="0.25"
                    ></content-loader>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <content-loader
                      :height="48"
                      :primary-opacity="0.25"
                    ></content-loader>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <content-loader
                      :height="32"
                      :primary-opacity="0.25"
                    ></content-loader>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <content-loader
                      :height="48"
                      :primary-opacity="0.25"
                    ></content-loader>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap">
                    <content-loader
                      :height="48"
                      :primary-opacity="0.25"
                    ></content-loader>
                  </td>
                  <td class="px-6 py-4 whitespace-no-wrap"></td>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      ui: {
        showFeesBreakdown: false,
        showLiquidityBreakdown: false,
      },
      poolTokens: null,
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
      web3ModalProvider: null,
      checkForProvider: null,
    }
  },
})
</script>

<style>
</style>
