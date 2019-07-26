const { scripts, ConfigVariablesInitializer } = require("zos")
const { add, push, create } = scripts

const deployAccount = "0x34CA72ECfc2b75F603BDad0A3651DB639FbB9c65"

async function deploy(options) {
  add({ contractsData: [{ name: "Marketplace", alias: "Marketplace" }] })

  await push(options)

  await create(
    Object.assign(
      {
        contractAlias: "Marketplace",
        initMethod: "initialize",
        initArgs: []
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
