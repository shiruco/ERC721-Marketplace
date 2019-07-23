const { scripts, ConfigVariablesInitializer } = require("zos")
const { add, push, create } = scripts

const deployAccount = "0x321039d1f46af2602af9a78b331597c04380a2f2"

async function deploy(options) {
  add({ contractsData: [{ name: "AssetToken", alias: "AssetToken" }] })

  await push(options)

  await create(
    Object.assign(
      {
        contractAlias: "AssetToken",
        initMethod: "initialize",
        initArgs: ["AssetToken", "ATKN"]
      },
      options
    )
  )
}

module.exports = function(deployer, networkname) {
  deployer.then(async () => {
    const {
      network,
      txParams
    } = await ConfigVariablesInitializer.initNetworkConfiguration({
      network: networkname,
      from: deployAccount
    })

    await deploy({ network, txParams })
  })
}
