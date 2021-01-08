import React, { Component } from "react";
import { InputGroup, FormControl, Button, Alert } from "react-bootstrap";
import { ethers } from "ethers";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";
import copy from "copy-to-clipboard";

export default class extends Component {
  state = {
    currentScreen: 0,
    esAmount: "0",
    inputError: "",
    couponBytes: new Uint8Array(),
    couponHash: "",
    Encodevalue: "",
    spinner0: false,
    spinner1: false,
    showApproveTransactionModal: false,
    approveTxHash: null,
    showNewCouponTransactionModal: false,
    newCouponTxHash: null,
  };
  downloadRef = React.createRef();
  intervalId = null;

  componentDidMount = () => {
    if (!window.wallet)
      this.setState({ inputError: "PLease Connect to wallet" });
  };
  componentDidUpdate = () => {};

  createCoupon = async (e) => {
    e.preventDefault();
    this.setState({ showNewCouponTransactionModal: true });
    if (window.wallet) {
      const A = await window.couponDappInstance
        .connect(window.wallet)
        .populateTransaction.newCoupon(
          this.state.couponHash,
          ethers.utils.parseEther(this.state.esAmount),
          {
            value: ethers.utils.parseEther(this.state.esAmount),
          }
        );

      console.log("call : ", A);
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to undo this action!",
        html: `<p>You will not be able to undo this action!</p>
                        <h1 style={{fontStyle:"bold"}}> Value : ${
                          A.value ? ethers.utils.formatEther(A?.value) : "0"
                        } </h1>
                        <small> To : ${A.to} </small><br/><small> From : ${
          A.from
        } ES </small>
                        <p> gasFee : ${A?.gasPrice || "0"} </p>`,
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "No, cancel!",
        confirmButtonText: "Yes, do it!",
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return window.couponDappInstance
            .connect(window.wallet)
            .newCoupon(
              this.state.couponHash,
              ethers.utils.parseEther(this.state.esAmount),
              {
                value: ethers.utils.parseEther(this.state.esAmount),
              }
            )
            .then(async (res) => {
              await res.wait();
              this.setState({
                newCouponTxHash: res.hash,
              });

              Swal.fire({
                title: "Good job!",
                icon: "success",
                html: `<p>You Coupon has been Added</p><br/>Transaction Hash<a>${res.hash}</a><br/>please save your coupon code `,
              });
            })
            .catch(async () => {
              const add = window.wallet.address
                ? window.wallet.address
                : await window.wallet.getAddress();
              const x = new ethers.VoidSigner(add, window.providerESN);
              try {
                await window.couponDappInstance
                  .connect(x)
                  .estimateGas.newCoupon(
                    this.state.couponHash,
                    ethers.utils.parseEther(this.state.esAmount),
                    {
                      value: ethers.utils.parseEther(this.state.esAmount),
                    }
                  );
              } catch (e) {
                console.log("Error is : ", e);
                Swal.fire("Oops...!", `${e}`, "error");
              }
            });
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Please Connect to wallet ...",
      });
    }

    this.setState({
      showNewCouponTransactionModal: false,
    });
  };
  downloadQR = () => {
    // var canvas = new Image();
    // var container = document.getElementById("QRCodeCard") ;
    // var container = document.body; // full page

    html2canvas(document.querySelector("#QRCodeCard0"), {
      allowTaint: true,
      logging: true,
      useCORS: true,
      foreignObjectRendering: true,
    }).then(function (canvas) {
      var link = document.createElement("a");
      document.body.appendChild(link);
      link.href = canvas.toDataURL("image/png");
      link.download = "html_image.png";
      link.target = "_blank";
      link.click();
    });
  };

  componentWillUnmount = () => {
    // clearInterval(this.intervalId);
    if (window.wallet) this.setState({ inputError: "" });
  };

  render = () => (
    <div className="welcome-area v2 wow fadeInUp" id="home">
      <section className="main_slider_area banner">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <p>
                It`s Middlemen-free <span className="line"></span>
              </p>
              <h2>
                Send Eraswap Token to anyone{" "}
                <span>With CouponDApp, Simply</span>
              </h2>
              <h6>
                CouponDApp offers a solution that allows user to send Era Swap
                Tokens via unique file through E-mail
              </h6>
            </div>
            <div className="col-md-6"></div>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-6 align-self-center">
            <div className="welcome-right">
              <div className="welcome-text">
                <h1>Create Era Swap Coupon</h1>
                <p>
                  Send Crypto via Email, WhatsApp, SMS or even through a
                  traditional letter!
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-5 offset-1 align-self-center">
            <div className="v2 welcome-progress create-coupon-form-1">
              {(() => {
                switch (this.state.currentScreen) {
                  case 0:
                    return (
                      <>
                        <InputGroup
                          className={
                            this.state.inputError ? "red-border" : null
                          }
                        >
                          <FormControl
                            type="number"
                            placeholder="Enter coupon amount"
                            className="large"
                            value={this.state.esAmount}
                            onChange={(e) =>
                              this.setState({
                                spinner0: false,
                                esAmount: e.target.value,
                              })
                            }
                          />
                          <InputGroup.Append>
                            <Button
                              className="large"
                              variant="outline-secondary"
                              disabled
                            >
                              ES
                            </Button>
                          </InputGroup.Append>
                        </InputGroup>

                        {this.state.inputError ? (
                          <Alert variant="danger" style={{ marginTop: "1rem" }}>
                            {this.state.inputError}
                          </Alert>
                        ) : null}

                        <Button
                          disabled={
                            !!this.state.inputError ||
                            !this.state.esAmount ||
                            this.state.spinner0
                          }
                          className="create-coupon-button"
                          block={true}
                          onClick={async () => {
                            this.setState({ spinner0: true });
                            const couponBytes = ethers.utils.randomBytes(32);
                            const couponHash = ethers.utils.hexlify(
                              couponBytes
                            );
                            const signature = await window.wallet.signMessage(
                              couponBytes
                            );
                            const Encodevalue: string = ethers.utils.RLP.encode(
                              [couponHash, signature]
                            );
                            this.setState({
                              currentScreen: 1,
                              couponBytes,
                              couponHash,
                              Encodevalue,
                              spinner0: false,
                            });
                          }}
                        >
                          {!this.state.spinner0 ? (
                            <>Create Coupon</>
                          ) : (
                            <>Generating Coupon...</>
                          )}
                        </Button>
                      </>
                    );
                  case 1:
                    return (
                      <>
                        <h3>Step 2</h3>
                        Download the coupon QR code by clicking below button.
                        This coupon will be activated once all the steps are
                        completed.
                        <div className="text-center ">
                          <div
                            id="QRCodeCard0"
                            className="border border-info rounded m-4 p-5 "
                          >
                            <QRCode
                              crossOrigin="anonymous"
                              id="QRCodeCanvas"
                              value={this.state.Encodevalue}
                              size={256}
                              lavel="H"
                              includeMargin={false}
                              imageSettings={{
                                src:
                                  "https://ipfs.eraswap.cloud/ipfs/QmddZCyGSbNpBrxLpFa2aJSq9a5UiZ6i54PDdYfWkTJkrU", //QmYT1LCrmuYky1q6s1f91poJ8inMLmfSvsDD7DGx2miLVh",
                                x: null,
                                y: null,
                                height: 48,
                                width: 48,
                                excavate: false,
                              }}
                            />
                            <h1 className="mt-3">
                              <img
                                src="https://ipfs.eraswap.cloud/ipfs/QmcfYykQcK3r4gABeU4f7vnRVHdYW4yhPS3dzkG4QRaFEX"
                                className="m-auto pb-2 "
                                alt="eraswap"
                              />
                              {this.state.esAmount} ES
                            </h1>
                          </div>
                          <p>OR</p>
                          Copy this code{" "}
                          <i
                            className="fa fa-clone"
                            onClick={() => {
                              copy(this.state.Encodevalue);
                            }}
                          ></i>
                          <Alert
                            className="text-wrap text-monospace"
                            variant="info"
                            style={{ wordWrap: "break-word" }}
                          >
                            {this.state.Encodevalue}
                          </Alert>
                        </div>
                        <Button
                          disabled={this.state.spinner1}
                          block={true}
                          className="create-coupon-button"
                          onClick={() => {
                            this.setState({ spinner1: true });
                            this.downloadQR();
                            this.setState({
                              spinner1: false,
                              currentScreen: 2,
                            });
                          }}
                        >
                          {!this.state.spinner1 ? (
                            <>Download</>
                          ) : (
                            <>Generating file...</>
                          )}
                        </Button>
                      </>
                    );
                  case 2:
                    return (
                      <>
                        <h3>Step 3</h3>
                        <div className="text-center ">
                          <div
                            id="QRCodeCard"
                            className="border border-info rounded m-4 p-5"
                          >
                            <QRCode
                              crossOrigin="anonymous"
                              id="QRCodeCanvas"
                              value={this.state.Encodevalue}
                              size={256}
                              lavel="H"
                              includeMargin={false}
                              imageSettings={{
                                src:
                                  "https://ipfs.eraswap.cloud/ipfs/QmddZCyGSbNpBrxLpFa2aJSq9a5UiZ6i54PDdYfWkTJkrU", //QmYT1LCrmuYky1q6s1f91poJ8inMLmfSvsDD7DGx2miLVh",
                                x: null,
                                y: null,
                                height: 48,
                                width: 48,
                                excavate: false,
                              }}
                            />
                            <h1 className="mt-3">
                              <img
                                src="https://ipfs.eraswap.cloud/ipfs/QmcfYykQcK3r4gABeU4f7vnRVHdYW4yhPS3dzkG4QRaFEX"
                                className="m-auto pb-2 "
                                alt="eraswap"
                              />
                              {this.state.esAmount} ES
                            </h1>
                          </div>
                          <p>OR</p>
                          Copy this code{" "}
                          <i
                            className="fa fa-clone"
                            onClick={() => {
                              copy(this.state.Encodevalue);
                            }}
                          ></i>
                          <Alert
                            className="text-wrap text-monospace"
                            variant="info"
                            style={{ wordWrap: "break-word" }}
                          >
                            {this.state.Encodevalue}
                          </Alert>
                        </div>
                        {!this.state.newCouponTxHash ? (
                          <>
                            Please click the below button to activate your
                            coupon.
                            <Button
                              disabled={
                                this.state.showNewCouponTransactionModal
                              }
                              block={true}
                              onClick={this.createCoupon}
                            >
                              {!this.state.showNewCouponTransactionModal ? (
                                <>Activate New Coupon</>
                              ) : (
                                <>Transaction in progress...</>
                              )}
                            </Button>
                          </>
                        ) : (
                          <>
                            <Alert variant="success">
                              Your coupon is activated! You can view your
                              transaction on{" "}
                              <a href="https://eraswap.info/txn/">EtherScan</a>.
                            </Alert>
                            Now you can share the coupon to your friend through
                            email or whatsapp.
                          </>
                        )}
                      </>
                    );
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
