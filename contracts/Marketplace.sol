pragma solidity ^0.5.0;

import "zos-lib/contracts/Initializable.sol";
import 'openzeppelin-eth/contracts/ownership/Ownable.sol';
import 'openzeppelin-eth/contracts/lifecycle/Pausable.sol';
import 'openzeppelin-eth/contracts/token/ERC721/IERC721.sol';

/// @title Token Interface Contract
/// @author shiruco
contract TokenInterface is IERC721 {
  function transactionToken(address to, uint256 tokenId) external payable;
}

/// @title ERC721 Marketplace Contract
/// @author shiruco
contract Marketplace is Initializable, Ownable, Pausable {
  function initialize() public initializer {}

  function transferFrom(address nftAddress, uint256 tokenId) external payable {
    TokenInterface registry = TokenInterface(nftAddress);
    registry.transactionToken.value(msg.value)(msg.sender, tokenId);
  }
}
