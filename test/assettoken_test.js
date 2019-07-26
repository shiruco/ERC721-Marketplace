const AssetToken = artifacts.require("AssetToken.sol")

contract("AssetToken", function(accounts) {
  it("...should token name is correct.", async () => {
    const deployedToken = await AssetToken.deployed()

    const name = await deployedToken.name()
    assert.equal(name, "AssetToken")
  })

  it("...should token symbol is correct.", async () => {
    const deployedToken = await AssetToken.deployed()

    const symbol = await deployedToken.symbol()
    assert.equal(symbol, "ATKN")
  })

  it("...should be mint token.", async () => {
    let deployedToken = await AssetToken.deployed()
    deployedToken.mint("test1")
    let token = await deployedToken.getToken(0)
    assert.equal(token.name, "test1")
  })

  it("...should be correct parameter.", async () => {
    let deployedToken = await AssetToken.deployed()
    deployedToken.mint("test2")
    let token = await deployedToken.getToken(1)
    assert.equal(token.price, 0)
    assert.equal(token.forSale, false)
  })

  it("...should be unique.", async () => {
    let deployedToken = await AssetToken.deployed()
    deployedToken.mint("test3")
    deployedToken.mint("test4")
    let token = await deployedToken.getToken(3)
    assert.equal(token.name, "test4")
  })
})
