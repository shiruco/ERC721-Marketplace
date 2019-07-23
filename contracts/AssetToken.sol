pragma solidity ^0.5.0;

import "zos-lib/contracts/Initializable.sol";
import 'openzeppelin-eth/contracts/token/ERC721/ERC721Full.sol';
import 'openzeppelin-eth/contracts/token/ERC721/ERC721Mintable.sol';

/// @title ERC721 Token Contract
/// @author shiruco
contract AssetToken is Initializable, ERC721Full, ERC721Mintable {

  event TokenSelled(uint256 tokenId);

  Token[] public tokens;

  struct Token {
    // asset name
    string name;
    // asset format
    string format;
    // asset sell price
    uint256 price;
    // if token is selled
    bool forSale;
  }

  function initialize(string memory name, string memory symbol) public initializer {
    ERC721.initialize();
    ERC721Enumerable.initialize();
    ERC721Metadata.initialize(name, symbol);
    ERC721Mintable.initialize(msg.sender);
  }

  function mint(string calldata name) external {
    Token memory _token = Token({
      name: name,
      format: "obj",
      price: 0,
      forSale: false
    });
    uint256 tokenId = tokens.push(_token) - 1;
    super._mint(msg.sender, tokenId);
  }

  function sellToken(address marketContract, uint256 tokenId, uint256 price) external {
    require(ownerOf(tokenId) == msg.sender);
    Token storage _token = tokens[tokenId];
    _token.price = price;
    _token.forSale = true;

    setApprovalForAll(marketContract, true);

    emit TokenSelled(tokenId);
  }

  function transactionToken(address to, uint256 tokenId) external payable {
    address payable owner = address(uint160(ownerOf(tokenId)));
    require(owner != msg.sender);
    require(owner != address(0));

    Token storage _token = tokens[tokenId];
    require(msg.value >= _token.price);
    require(_token.forSale == true);

    approve(to, tokenId);
    owner.transfer(_token.price);

    safeTransferFrom(owner, to, tokenId);
    _token.price = 0;
    _token.forSale = false;
  }

  function tokensOfOwner(address _owner) external view returns (uint256[] memory) {
    uint256 balance = balanceOf(_owner);

    if (balance == 0) {
      return new uint256[](0);
    } else {
      uint256[] memory result = new uint256[](balance);
      uint256 maxTokenId = totalSupply();
      uint256 idx = 0;

      uint256 tokenId;
      for (tokenId = 0; tokenId < maxTokenId; tokenId++) {
        if (ownerOf(tokenId) == _owner) {
          result[idx] = tokenId;
          idx++;
        }
      }
      return result;
    }
  }

  function getToken(uint256 tokenId)
    external
    view
    returns (
        uint256 id,
        string memory name,
        string memory format,
        uint256 price,
        bool forSale,
        address owner
    ) {
        Token storage _token = tokens[tokenId];
        id = tokenId;
        name = _token.name;
        format = _token.format;
        price = _token.price;
        forSale = _token.forSale;
        owner = ownerOf(tokenId);
    }
}
