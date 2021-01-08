import React, { Component } from 'react';
import { decodeCoupon, lessDecimals } from '../../utils';
import { Alert, Button } from 'react-bootstrap';

import TransactionModal from '../TransactionModal/TransactionModal';

const ethers = require('ethers');
const bs58 = require('bs58');

const network = 5197; 

const COUPON_STATUS_ENUM = { NOT_CREATED: 0, ACTIVE: 1, REDEEMED: 2 };

export default class extends Component {
  state = {
    keccak256: null,
    couponBytes: null,
    amount: null,
    status: null,
    showRedeemCouponTransactionModal: false,
    redeemCouponTxHash: null,
  };

  componentDidMount = async () => {
    const { couponBytes, keccak256 } = decodeCoupon(this.props.coupon);
    this.setState({ couponBytes, keccak256 });

    const {
      amount,
      status,
    } = await window.couponDappInstance.functions.coupons(keccak256);

    this.setState({ amount, status });
  };

  render = () => (
    <>
      <div className="coupon-card">
        <span className="coupon-field">
          <span className="label">Coupon Code:</span>{' '}
          {(this.state.couponBytes &&
            bs58.encode(ethers.utils.arrayify(this.state.couponBytes))) ||
            'Please wait...'}
        </span>
        <span className="coupon-field">
          <span className="label">Coupon Amount:</span>{' '}
          {this.state.amount
            ? lessDecimals(this.state.amount)
            : 'Please wait...'}
        </span>

        <span className="coupon-field">
          {(() => {
            switch (this.state.status) {
              case null:
                return <>Please wait loading status...</>;
              case COUPON_STATUS_ENUM.NOT_CREATED:
                return (
                  <Alert variant="warning">
                    This coupon is not activated yet. The transaction for
                    registering new coupon is not done by the coupon creator or
                    might be pending for confirmation on Ethereum blockchain.
                    Please ask the coupon creator.
                  </Alert>
                );
              case COUPON_STATUS_ENUM.ACTIVE:
                return !this.state.redeemCouponTxHash ? (
                  <>
                    <Alert variant="success">
                      This coupon is ready for claiming!
                    </Alert>
                    <Button
                      disabled={this.state.showRedeemCouponTransactionModal}
                      onClick={() =>
                        this.setState({
                          showRedeemCouponTransactionModal: true,
                        })
                      }
                    >
                      {!this.state.showRedeemCouponTransactionModal ? (
                        <>Claim</>
                      ) : (
                        <>Claiming in process...</>
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    <Alert variant="success">
                      Your coupon is claimed and{' '}
                      {ethers.utils.formatEther(this.state.amount)} ES credited
                      to your account! You can view your transaction on{' '}
                      <a
                        href={`https://${
                          network !== 'homestead' ? network + '.' : ''
                        }etherscan.io/tx/${this.state.redeemCouponTxHash}`}
                      >
                        EtherScan
                      </a>
                      .
                    </Alert>
                  </>
                );
              case COUPON_STATUS_ENUM.REDEEMED:
                return (
                  <Alert variant="danger">
                    This coupon is already claimed and it cannot be claimed
                    again.
                  </Alert>
                );
            }
          })()}
        </span>
      </div>
      <TransactionModal
        show={this.state.showRedeemCouponTransactionModal}
        hideFunction={() =>
          this.setState({ showRedeemCouponTransactionModal: false })
        }
        ethereum={{
          transactor: window.couponDappInstance.functions.redeemCoupon,
          estimator: window.couponDappInstance.estimate.redeemCoupon,
          contract: window.couponDappInstance,
          contractName: 'Coupon ÐApp Contract',
          arguments: [this.state.couponBytes],
          ESAmount: this.state.amount ? lessDecimals(this.state.amount) : '0.0',
          headingName: 'Redeem Coupon',
          functionName: 'redeemCoupon',
          directGasScreen: true,
          continueFunction: (txHash) =>
            this.setState({
              showRedeemCouponTransactionModal: false,
              redeemCouponTxHash: txHash,
            }),
        }}
      />
    </>
  );
}
