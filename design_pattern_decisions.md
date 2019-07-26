# Design pattern decisions

## upgradable ERC721 Token

upgradable ERC721 token sample with ZeppelinOS

related post
https://medium.com/@maroton621

### env
- Truffle v5.0.4 (core: 5.0.4)
- Solidity v0.5.0 (solc-js)
- Node v11.3.0

### Deploy with Truffle

#### initialize zos
```
$ zos init sample-pj
```

#### start ganache
```
$ ganache-cli -p 7545 -d
```

#### contract migration
```
$ truffle migrate --network local
```

### Deploy with zos command

#### initialize zos
```
$ zos init sample-pj
```

#### start ganache
```
$ ganache-cli -p 7545 -d
```

#### deoloy v0
```
$ zos add SampleToken
$ zos push --network local
$ zos create SampleToken --init initialize --args="SampleToken,STKN" --network local
```

#### update v1
```
$ zos add SampleToken_v1:SampleToken
$ zos push --network local
$ zos update SampleToken --network local
```

### test
```
$ yarn start-ganache
$ yarn test
```



