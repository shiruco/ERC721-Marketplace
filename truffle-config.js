const HDWalletProvider = require("truffle-hdwallet-provider")
const mnemonic = process.env.ROPSTEN_MNEMONIC
const accessToken = process.env.INFURA_ACCESS_TOKEN

module.exports = {
  networks: {
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          "https://ropsten.infura.io/v3/" + accessToken
        )
      },
      network_id: 3,
      gas: 5000000
    },
    "ropsten-fork": {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          "https://ropsten.infura.io/v3/" + accessToken
        )
      },
      network_id: 3,
      gas: 5000000
    },
    // for truffle develop
    develop: {
      host: "localhost",
      port: 9545,
      gas: 5000000,
      gasPrice: 5e9,
      network_id: "*"
    },
    // for ganache-cli
    local: {
      host: "localhost",
      port: 8545,
      gas: 5000000,
      gasPrice: 5e9,
      network_id: "621"
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
}
