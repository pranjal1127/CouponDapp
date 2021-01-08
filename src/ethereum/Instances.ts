import { ethers } from "ethers";
import { CouponDappCouponDappFactory } from "./CouponDappCouponDappFactory";

// const nodeUrl = process.env.REACT_APP_NODE_URL || 'https://node2.testnet.eraswap.network/';

window.provider = new ethers.providers.JsonRpcProvider('https://mainnet.eraswap.network');
window.providerESN = new ethers.providers.JsonRpcProvider('https://mainnet.eraswap.network');
// window.provider = new CustomProvider("mainnet");

window.couponDappInstance = CouponDappCouponDappFactory.connect(
  "0x33BcecFe767F6d4946F4a40a754017aDA69484B0",
  window.providerESN 
); 
 
// export const BetInst = BetFactory.connect(addresses.Bet, providerESN);

// export const providerESN = new ethers.providers.JsonRpcProvider(nodeUrl);

console.log("custom provider", window.providerESN);
