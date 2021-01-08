import { ethers } from "ethers";
import { CustomProvider } from "eraswap-sdk";
import { CouponDappCouponDapp } from "./ethereum/CouponDappCouponDapp";

declare global {
  interface Window {
    provider: CustomProvider | ethers.providers.JsonRpcProvider;
    ethereum: ethers.providers.ExternalProvider;
    couponDappInstance: CouponDappCouponDapp;
    providerESN: CustomProvider | ethers.providers.JsonRpcProvider;
    wallet: any;
  }
}
