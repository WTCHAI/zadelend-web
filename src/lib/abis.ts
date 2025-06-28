import { parseAbi } from "viem";

export const LOAN_WITHDRAWER_ABI = parseAbi([
  // Errors
  "error InvalidRouter(address router)",

  // Events
  "event LeafCommitment(bytes32 indexed commitment, uint256 indexed leafIndex)",
  "event MessageReceived(bytes32 indexed messageId, uint64 indexed sourceChainSelector, address sender, bytes32 text)",

  // Functions
  "function FIELD_SIZE() view returns (uint256)",
  "function ROOT_HISTORY_SIZE() view returns (uint32)",
  "function ZERO_VALUE() view returns (uint256)",
  "function ccipReceive((bytes32 messageId, uint64 sourceChainSelector, bytes sender, bytes data, (address token, uint256 amount)[] destTokenAmounts) message)",
  "function currentRootIndex() view returns (uint32)",
  "function filledSubtrees(uint256) view returns (bytes32)",
  "function getLastReceivedMessageDetails() view returns (bytes32 messageId, bytes32 text)",
  "function getLastRoot() view returns (bytes32)",
  "function getRouter() view returns (address)",
  "function hashLeftRight(address _hasher, bytes32 _left, bytes32 _right) pure returns (bytes32)",
  "function hasher() view returns (address)",
  "function isKnownRoot(bytes32 _root) view returns (bool)",
  "function levels() view returns (uint32)",
  "function loanWithdraw(bytes32 nullifier, bytes32 _root, uint256[2] _pA, uint256[2][2] _pB, uint256[2] _pC, uint256[1] _pubSignals) payable",
  "function nextIndex() view returns (uint32)",
  "function nullifiers(bytes32) view returns (bool)",
  "function roots(uint256) view returns (bytes32)",
  "function supportsInterface(bytes4 interfaceId) view returns (bool)",
  "function tree(uint256, uint256) view returns (bytes32)",
  "function usdc() view returns (address)",
  "function verifier() view returns (address)",
  "function zeros(uint256 index) pure returns (bytes32)"
]);

export const NFT_DEPOSITOR_ABI = parseAbi([
  // Errors
  "error NotEnoughBalance(uint256 currentBalance, uint256 calculatedFees)",

  // Events
  "event LinkReceived(address indexed sender, uint256 amount)",
  "event MessageSent(bytes32 indexed messageId, uint64 indexed scrollSepoliaDest, address receiver, bytes32 text, address feeToken, uint256 fees)",
  "event NFTDeposit(address indexed nftAddress, address indexed owner, uint256 tokenId, uint256 startedTime, uint256 expiredTime)",
  "event NFTWithdraw(address indexed nftAddress, address indexed owner, uint256 tokenId, uint256 withdrawnTime)",
  "event OwnershipTransferRequested(address indexed from, address indexed to)",
  "event OwnershipTransferred(address indexed from, address indexed to)",

  // Functions
  "function LOCK_PERIOD() view returns (uint256)",
  "function REWARD_AMOUNT() view returns (uint256)",
  "function acceptOwnership()",
  "function depositNft(address nftAddress, uint256 tokenId, address receiver, bytes32 commitment) returns (bytes32 messageId)",
  "function depositsInfo(address, uint256) view returns (address owner, uint256 unlockTime, bool withdrawn)",
  "function destinationScrollSepolia() view returns (uint64)",
  "function getUnlockTime(address nftAddress, uint256 tokenId) view returns (uint256)",
  "function isWithdrawable(address nftAddress, uint256 tokenId) view returns (bool)",
  "function ntfPools() view returns (uint256)",
  "function onTokenTransfer(address sender, uint256 amount, bytes calldata)",
  "function owner() view returns (address)",
  "function s_linkToken() view returns (address)",
  "function s_router() view returns (address)",
  "function transferOwnership(address to)",
  "function usdc() view returns (address)",
  "function userLinkTokenBalance(address) view returns (uint256)",
  "function withdrawNft(address nftAddress, uint256 tokenId)",
]);

export const NFT_ABI = parseAbi([
  // Errors
  "error ERC721IncorrectOwner(address sender, uint256 tokenId, address owner)",
  "error ERC721InsufficientApproval(address operator, uint256 tokenId)",
  "error ERC721InvalidApprover(address approver)",
  "error ERC721InvalidOperator(address operator)",
  "error ERC721InvalidOwner(address owner)",
  "error ERC721InvalidReceiver(address receiver)",
  "error ERC721InvalidSender(address sender)",
  "error ERC721NonexistentToken(uint256 tokenId)",

  // Events
  "event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId)",
  "event ApprovalForAll(address indexed owner, address indexed operator, bool approved)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",

  // Functions
  "function approve(address to, uint256 tokenId)",
  "function balanceOf(address owner) view returns (uint256)",
  "function getApproved(uint256 tokenId) view returns (address)",
  "function isApprovedForAll(address owner, address operator) view returns (bool)",
  "function mint()",
  "function name() view returns (string)",
  "function nextTokenId() view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function safeTransferFrom(address from, address to, uint256 tokenId)",
  "function safeTransferFrom(address from, address to, uint256 tokenId, bytes data)",
  "function setApprovalForAll(address operator, bool approved)",
  "function supportsInterface(bytes4 interfaceId) view returns (bool)",
  "function symbol() view returns (string)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function transferFrom(address from, address to, uint256 tokenId)",
]);

export const USDC_ABI = parseAbi([
  // Errors
  "error ERC20InsufficientAllowance(address spender, uint256 allowance, uint256 needed)",
  "error ERC20InsufficientBalance(address sender, uint256 balance, uint256 needed)",
  "error ERC20InvalidApprover(address approver)",
  "error ERC20InvalidReceiver(address receiver)",
  "error ERC20InvalidSender(address sender)",
  "error ERC20InvalidSpender(address spender)",

  // Events
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",

  // Functions
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 value) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function mint(address to, uint256 amount)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 value) returns (bool)",
]);
