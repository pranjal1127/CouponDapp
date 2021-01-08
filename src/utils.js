const ethers = require('ethers');
const assert = require('assert');

export const lessDecimals = (ethersBigNumber, decimals = 2) => {
  let lessDecimals = ethers.utils.formatEther(ethersBigNumber).split('.');
  if (lessDecimals[1].length >= decimals) {
    lessDecimals[1] = lessDecimals[1].slice(0, decimals);
  }
  return lessDecimals.join('.');
};

const bs58 = require('bs58');
export const generateCouponFileJson = (bytes) => {
  return JSON.stringify({
    version: 1,
    data: bs58.encode(bytes),
    keccak256: ethers.utils.keccak256(bytes),
  });
};

export const decodeCoupon = (input) => {
  let keccak256, couponBytes;
  if (typeof input === 'object') {
    assert.ok(
      'version' in input,
      'Invalid coupon: doesnot contain coupon version'
    );
    switch (input.version) {
      case 1:
        assert.ok(
          'data' in input,
          'Invalid coupon: doesnot contain data field.'
        );
        couponBytes = ethers.utils.hexlify(bs58.decode(input.data));
        if ('keccak256' in input) {
          keccak256 = input.keccak256;
        } else {
          keccak256 = ethers.utils.keccak256(couponBytes);
        }
        break;
      default:
        throw new Error('Invalid coupon: contains unsupported coupon version.');
        break;
    }
  } else if (typeof input === 'string') {
    couponBytes = input;
    try {
      couponBytes = ethers.utils.hexlify(bs58.decode(couponBytes));
    } catch (error) {}
    keccak256 = ethers.utils.keccak256(couponBytes);
  }
  return { keccak256, couponBytes };
};
