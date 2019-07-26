<template>
  <div class="content">
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div>
          <h1 class="title is-size-5">
            MARKET PLACE DEMO
          </h1>
          <h2 class="subtitle is-size-7">
            ERC721 ASSET MARKETPLACE
          </h2>
        </div>
      </div>
    </section>
    <div class="wrapper">
      <basic-modal v-if="isModalForMetamask">
        <div id="modalMetamask" class="modal-contents">
          Please install Metamask.<br />
          <a class="metalink" href="https://metamask.io/">
            https://metamask.io/
          </a>
        </div>
      </basic-modal>
      <basic-modal v-if="isModalForEnv">
        <div id="modalEnv" class="modal-contents">
          Please connect Ropsten testnet.
        </div>
      </basic-modal>
      <basic-modal v-if="isModalForPurchaseSelected">
        <div id="modalPurchase" class="modal-contents">
          <div>Do you want to purchase this asset?</div>
          <div class="purchase-txt">It costs {{ purchasePrice }}ETH + gas.</div>
          <div class="modal-model">
            <img src="~/assets/images/model.png" width="50%" />
          </div>
        </div>
      </basic-modal>
      <basic-modal v-if="isModalForSaleSelected">
        <div id="modalForSale" class="modal-contents">
          <div>このモデルを売却しますか？</div>
          <div class="modal-model">
            <img src="~/assets/images/model.png" width="50%" />
          </div>
        </div>
      </basic-modal>
      <basic-modal v-if="isModalForSetSalePrice">
        <div id="modalForSalePrice" class="modal-contents">
          <div>モデルの販売価格を設定してください。</div>
          <div class="modal-model">
            <img src="~/assets/images/model.png" width="50%" />
          </div>
        </div>
        <div class="is-size-7 has-text-centered error">
          {{ error }}
        </div>
        <div class="form-eth">
          <input
            ref="ethInput"
            class="input input-eth"
            type="number"
            placeholder="0.001"
            @change="ethInputChange"
          />
          <p>ETH</p>
        </div>
        <div class="is-size-7 has-text-centered">
          0.001ETH以上を設定してください。
        </div>
      </basic-modal>
      <basic-modal v-if="isModalLoading">
        <div id="modalLoading" class="modal-contents">
          <div ref="progressMes">処理中です...</div>
          <div class="spinner">
            <div class="cube1"></div>
            <div class="cube2"></div>
          </div>
        </div>
      </basic-modal>
      <basic-modal v-if="isModalComplete">
        <div id="modalComplete" class="modal-contents">
          <div>取引が正常に完了しました！</div>
        </div>
      </basic-modal>
      <div class="contents">
        <div class="tabs is-toggle is-toggle-rounded">
          <ul class="tabs-ul">
            <li
              :class="{ 'is-active': isSaleTabActive }"
              class="tab"
              @click="handleOnClickTab(TABS.SALE)"
            >
              <a>
                <span class="icon is-small"><i class="fas fa-cube"></i></span>
                <span>ON SALE</span>
              </a>
            </li>
            <li
              :class="{ 'is-active': isPurchasedTabActive }"
              class="tab"
              @click="handleOnClickTab(TABS.PURCHASED)"
            >
              <a>
                <span class="icon is-small"><i class="fas fa-cube"></i></span>
                <span>PURCHASED</span>
              </a>
            </li>
          </ul>
        </div>
        <div
          v-if="saledAssets.length > 0"
          :class="{ 'is-active': isSaleTabActive }"
          class="tile is-ancestor tile-wrapper"
        >
          <div
            v-for="asset in saledAssets"
            :key="`asset-${asset.id}`"
            :class="{ 'is-clickable': asset.forSale }"
            class="tile tab-sale is-parent is-3"
            @click="handleOnClickAssetForPurchase(asset.id)"
          >
            <article
              :class="{ sold: !asset.forSale }"
              class="tile is-child box"
            >
              <p class="title is-size-5">{{ asset.name }}</p>
              <p v-if="asset.forSale" class="subtitle is-size-6">
                {{ asset.price }} ETH
              </p>
              <p v-else class="subtitle is-size-6">sold out</p>
              <div class="img-container">
                <img src="~/assets/images/model.png" width="200px" />
              </div>
              <p class="subtitle is-size-7">owner: {{ asset.owner }}</p>
            </article>
            <div v-if="!asset.forSale" class="img-sold">
              <img src="~/assets/images/sold.png" width="60px" />
            </div>
          </div>
        </div>
        <div
          v-else
          :class="{ 'is-active': isSaleTabActive }"
          class="tile is-ancestor tile-wrapper"
        >
          <p class="mes">
            There is no assets on sale.
          </p>
        </div>
        <div
          v-if="purchasedAssets.length > 0"
          :class="{ 'is-active': isPurchasedTabActive }"
          class="tile is-ancestor tile-wrapper"
        >
          <div
            v-for="asset in purchasedAssets"
            :key="`asset-${asset.id}`"
            :class="{ 'is-clickable': !asset.forSale }"
            class="tile tab-sale is-parent is-3"
            @click="handleOnClickAssetForSale(asset.id)"
          >
            <article :class="{ sold: asset.forSale }" class="tile is-child box">
              <p class="title is-size-5">{{ asset.name }}</p>
              <p v-if="asset.forSale" class="subtitle is-size-6">
                on Sale
              </p>
              <p v-else class="subtitle is-size-6">owned</p>
              <div class="img-container">
                <img src="~/assets/images/model.png" width="200px" />
              </div>
              <p class="subtitle is-size-7">owner: {{ asset.owner }}</p>
            </article>
          </div>
        </div>
        <div
          v-else
          :class="{ 'is-active': isPurchasedTabActive }"
          class="tile is-ancestor tile-wrapper"
        >
          <p class="mes">
            There is no purchased assets.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import { Action, namespace } from "vuex-class"
import BasicModal from "~/components/molecules/BasicModal.vue"
import Scene from "~/components/organisms/Scene.vue"
import Web3 from "web3"

const BasicModalAction = namespace("basicModal", Action)

declare global {
  interface Window {
    ethereum: any
    web3: Web3
  }
}

interface Asset {
  id: number
  name: string
  price: number
  forSale: boolean
  owner: string
}

@Component({
  components: {
    Scene,
    BasicModal
  }
})
export default class Page extends Vue {
  @BasicModalAction
  openModal: (payload) => void

  NETWORK_ID: String = "621"

  web3: Web3
  VRPressToken: any
  myAddress: string
  isRopsten: boolean = false

  TABS = {
    SALE: 1,
    PURCHASED: 2,
    UPLOAD: 3
  }

  MODALS = {
    METAMASK: 0,
    ENV: 1,
    FOR_PURCHASE: 2,
    FOR_SALE: 3,
    FOR_SET_SALE_PRICE: 4,
    LOADING: 5,
    COMPLETE: 6
  }

  $refs: {
    ethInput: HTMLInputElement
    progressMes: HTMLDivElement
  }

  purchasePrice: number = 0
  salePrice: number = 0
  error: string = ""

  /** data */
  assets: Asset[] = []
  currentTab = this.TABS.SALE
  selectedModal = this.MODALS.METAMASK

  /** computed */
  get isSaleTabActive() {
    return this.currentTab === this.TABS.SALE
  }
  get isPurchasedTabActive() {
    return this.currentTab === this.TABS.PURCHASED
  }
  get isUploadTabActive() {
    return this.currentTab === this.TABS.UPLOAD
  }
  get saledAssets() {
    return this.assets
    //return this.assets.filter(asset => asset.forSale === true)
  }
  get purchasedAssets() {
    return this.assets.filter(asset => asset.owner === this.myAddress)
  }
  get isModalForMetamask() {
    return this.selectedModal === this.MODALS.METAMASK
  }
  get isModalForEnv() {
    return this.selectedModal === this.MODALS.ENV
  }
  get isModalForPurchaseSelected() {
    return this.selectedModal === this.MODALS.FOR_PURCHASE
  }
  get isModalForSaleSelected() {
    return this.selectedModal === this.MODALS.FOR_SALE
  }
  get isModalForSetSalePrice() {
    return this.selectedModal === this.MODALS.FOR_SET_SALE_PRICE
  }
  get isModalLoading() {
    return this.selectedModal === this.MODALS.LOADING
  }
  get isModalComplete() {
    return this.selectedModal === this.MODALS.COMPLETE
  }

  /** methods */
  layout() {
    return "base"
  }

  isMyModel(assetId) {
    return this.assets[assetId].owner === this.myAddress
  }

  handleOnClickTab(tab) {
    this.currentTab = tab
  }

  ethInputChange(e) {
    this.salePrice = +e.target.value
  }

  ethInputValidation() {
    if (!this.salePrice) {
      return "価格の値が不正です。"
    }
    if (this.salePrice < 0.001) {
      return "0.001ETH以上を設定してください。"
    }
    if (this.salePrice > 100) {
      return "100ETH以下を設定してください。"
    }
  }

  getDeployData() {
    if (this.isRopsten) {
      //return require(`../zos.ropsten.json`)
    } else {
      return require(`../zos.dev-${this.NETWORK_ID}.json`)
    }
  }

  async getWeb3() {
    let web3: Web3 | undefined

    if (window.ethereum) {
      // Modern dapp browsers
      web3 = new Web3(window.ethereum)
      try {
        // metamaskが開いて権限許可を尋ねる
        await window.ethereum.enable()
      } catch (error) {
        // 拒否した場合に入ってくる
        console.log("denied")
      }
    } else if (window.web3) {
      // Legacy dapp browsers...
      web3 = new Web3(window.web3.currentProvider)
    } else {
      this.selectedModal = this.MODALS.METAMASK
      this.openModal({
        title: "confirm",
        isOnlyConfirm: true
      })
    }

    web3 = new Web3(window.web3.currentProvider)
    return web3
  }

  handleOnClickAssetForPurchase(tokenId) {
    this.selectedModal = this.MODALS.FOR_PURCHASE
    const asset: Asset = this.assets.filter(asset => asset.id === tokenId)[0]

    if (!asset.forSale) return

    this.purchasePrice = asset.price

    this.openModal({
      title: `${asset.name}`,
      isDecideBtnActive: !this.isMyModel(asset.id),
      handleOnClickDecide: async () => {
        const deployData = this.getDeployData()
        const tokenProxyAdresses = deployData.proxies["marketplace/AssetToken"]
        const marketProxyAdresses =
          deployData.proxies["marketplace/Marketplace"]
        const Marketplace = await new this.web3.eth.Contract(
          require("../build/contracts/Marketplace.json").abi,
          marketProxyAdresses[marketProxyAdresses.length - 1].address
        )

        await Marketplace.methods
          .transferFrom(
            tokenProxyAdresses[tokenProxyAdresses.length - 1].address,
            asset.id
          )
          .send(
            {
              from: this.myAddress,
              value: this.web3.utils.toWei(asset.price.toString(), "ether"),
              gas: 300000
            },
            () => {
              this.selectedModal = this.MODALS.LOADING
              this.openModal({
                title: "Trading in progress",
                isFreezed: true
              })
            }
          )
          .on("confirmation", () => {
            this.selectedModal = this.MODALS.COMPLETE
            this.openModal({
              title: "Completed!",
              isOnlyConfirm: true,
              closeHook: () => {
                location.reload()
              }
            })
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    })
  }

  async handleOnClickAssetForSale(tokenId) {
    this.selectedModal = this.MODALS.FOR_SALE
    const asset: Asset = this.assets.filter(asset => asset.id === tokenId)[0]

    if (asset.forSale) return

    await (() => {
      return new Promise(resolve => {
        this.openModal({
          title: `${asset.name}`,
          handleOnClickDecide: async () => {
            this.selectedModal = this.MODALS.FOR_SET_SALE_PRICE
            resolve()
          }
        })
      })
    })()

    await this.openModal({
      title: `${asset.name}の価格設定`,
      handleOnClickDecide: async () => {
        // validation
        const error = this.ethInputValidation()
        if (error) {
          this.error = error
          return
        } else {
          this.error = ""
        }

        const deployData = this.getDeployData()
        const tokenProxyAdresses = deployData.proxies["marketplace/AssetToken"]
        const marketProxyAdresses =
          deployData.proxies["marketplace/Marketplace"]

        const VRPressToken = await new this.web3.eth.Contract(
          require("../build/contracts/AssetToken.json").abi,
          tokenProxyAdresses[tokenProxyAdresses.length - 1].address
        )

        const assetPrice = this.$refs.ethInput.value

        await VRPressToken.methods
          .sellToken(
            marketProxyAdresses[marketProxyAdresses.length - 1].address,
            asset.id,
            this.web3.utils.toWei(assetPrice.toString(), "ether")
          )
          .send(
            {
              from: this.myAddress,
              gas: 300000
            },
            () => {
              this.selectedModal = this.MODALS.LOADING
              this.openModal({
                title: "取引実行中",
                isFreezed: true
              })
            }
          )
          .on("confirmation", () => {
            this.selectedModal = this.MODALS.COMPLETE
            this.openModal({
              title: "取引完了",
              isOnlyConfirm: true,
              closeHook: () => {
                location.reload()
              }
            })
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    })
  }

  /** lifecycle hook */
  async mounted() {
    const ua = window.navigator.userAgent
    if (
      ua.indexOf("iPhone") > 0 ||
      (ua.indexOf("Android") > 0 && ua.indexOf("Mobile") > 0) ||
      ua.indexOf("Windows Phone") > 0
    ) {
      alert("Sorry.. This service does not correspond to mobile.")
      location.href = "/"
    }

    this.web3 = await this.getWeb3()

    await this.web3.eth.net.getNetworkType((err, netId) => {
      switch (netId) {
        case "ropsten":
          this.isRopsten = true
          console.log("This is the ropsten test network.")
          break
        case "private":
          console.log("This is the private test network.")
          break
        default:
          this.selectedModal = this.MODALS.ENV
          this.openModal({
            title: "confirm",
            isOnlyConfirm: true
          })
      }
    })

    await this.web3.eth.getAccounts((error, accounts) => {
      if (error) return
      this.myAddress = accounts[0]
    })

    const contractData = require("../build/contracts/AssetToken.json")
    const deployData = this.getDeployData()
    const tokenProxyAdresses = deployData.proxies["marketplace/AssetToken"]

    this.VRPressToken = await new this.web3.eth.Contract(
      contractData.abi,
      tokenProxyAdresses[tokenProxyAdresses.length - 1].address
    )

    const totalSupply = await this.VRPressToken.methods.totalSupply().call()

    for (let i = 0; i < totalSupply; i++) {
      const token = await this.VRPressToken.methods.getToken(i).call()
      console.log(token)
      const asset: Asset = {
        id: token["0"],
        name: token["1"],
        price: +this.web3.utils.fromWei(token[3].toString(), "ether"),
        forSale: token["4"],
        owner: token["5"]
      }
      this.assets.push(asset)
    }
  }
}
</script>

<style scoped type="scss">
.wrapper {
  display: flex;
  background-color: #ececec;
  padding: 10px;
}
.content {
  width: 100%;
}
.hero-body {
  padding: 20px;
}
.container {
  width: 100%;
}
.tabs-ul {
  margin-left: 0;
}
.tabs-ul li {
  margin-top: 0;
}
.contents {
  width: 100%;
  padding: 0px 20px;
}
.is-clickable {
  cursor: pointer;
}
.is-active {
  display: flex !important;
}
.tile-wrapper {
  display: none;
  flex-wrap: wrap;
  padding-top: 10px;
}
.tab-sale {
  position: relative;
}
.sold {
  background: #c1c1c1;
}
.mes {
  margin: 20px 30px;
}
.form-eth {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
}
.label-eth {
  text-align: left;
}
.input-eth {
  width: 200px;
  margin-right: 10px;
  text-align: right;
}
.metalink {
  color: #000;
}
.img-container {
  text-align: center;
}
.img-sold {
  position: absolute;
  top: 73px;
  right: 10%;
}
.modal-model {
  text-align: center;
  padding: 20px 0 0 0;
}
.purchase-txt {
  font-weight: bold;
  margin: 10px 0;
}
.error {
  color: red;
}
.spinner {
  margin: 30px auto;
  width: 40px;
  height: 40px;
  position: relative;
}

.cube1,
.cube2 {
  background-color: #de8400;
  width: 15px;
  height: 15px;
  position: absolute;
  top: 0;
  left: 0;

  -webkit-animation: sk-cubemove 1.8s infinite ease-in-out;
  animation: sk-cubemove 1.8s infinite ease-in-out;
}

.cube2 {
  -webkit-animation-delay: -0.9s;
  animation-delay: -0.9s;
}

@-webkit-keyframes sk-cubemove {
  25% {
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    -webkit-transform: rotate(-360deg);
  }
}

@keyframes sk-cubemove {
  25% {
    transform: translateX(42px) rotate(-90deg) scale(0.5);
    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);
  }
  50% {
    transform: translateX(42px) translateY(42px) rotate(-179deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);
  }
  50.1% {
    transform: translateX(42px) translateY(42px) rotate(-180deg);
    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);
  }
  75% {
    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);
    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg)
      scale(0.5);
  }
  100% {
    transform: rotate(-360deg);
    -webkit-transform: rotate(-360deg);
  }
}
</style>
