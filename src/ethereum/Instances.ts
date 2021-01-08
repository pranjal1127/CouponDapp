import { ethers } from "ethers";
import { CouponDappCouponDappFactory } from "./CouponDappCouponDappFactory";

// const nodeUrl = process.env.REACT_APP_NODE_URL || 'https://node2.testnet.eraswap.network/';

window.provider = new ethers.providers.JsonRpcProvider(
  "https://mainnet.eraswap.network"
);
window.providerESN = new ethers.providers.JsonRpcProvider(
  "https://mainnet.eraswap.network"
);
// window.provider = new CustomProvider("mainnet");

window.couponDappInstance = CouponDappCouponDappFactory.connect(
  "0x4a8726221fC5f97b691c1D8B83742508fDfF15C6",
  window.providerESN
);

// export const BetInst = BetFactory.connect(addresses.Bet, providerESN);

// export const providerESN = new ethers.providers.JsonRpcProvider(nodeUrl);

console.log("custom provider", window.providerESN);
