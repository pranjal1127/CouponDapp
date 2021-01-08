import { ethers } from 'ethers';
import React, { Component } from 'react';
import { Alert,Button,Card, FormControl } from 'react-bootstrap';
import QRCodeScanner,{ IQRCodeValidateResponse } from './QRCodeScanner';
import QrReader from "react-qr-reader";
import Swal from 'sweetalert2';


export default class extends Component {

  constructor(props) {
    super(props);
  
    
    this.handleImgSubmit = this.handleImgSubmit.bind(this);
 };

  state = {
    fileBeingDragged: false,
    fileError: '',
    scanner: false,
    uri: '',
    hash: '',
    signature : '',
    error : false,
    coupon : []
  };
  STATE = ['Invalid','Active','Redeemed'];
  // qrReader1 = React.createRef();

  redeemCoupon = async (e) => {
    e.preventDefault();
    if (window.wallet) {
      const A = await window.couponDappInstance.connect(
        window.wallet
      ).populateTransaction.redeemCoupon(this.state.hash,this.state.signature)
       
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
          return window.couponDappInstance.connect(window.wallet)
            .redeemCoupon(this.state.hash,this.state.signature)
            .then(async (res) => {
              await res.wait();
                            

              Swal.fire({
                title: "Good job!",
                icon: "success",
                html: `<p>You have successfully redeem  Coupon</p><br/>Transaction Hash<a>${res.hash}</a><br/>Coupon ES has been added into your wallet `,
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
                  .estimateGas.redeemCoupon(this.state.hash,this.state.signature);
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
    })
  
}

  public toggleScanner = () => {
    console.log("ACTION", "toggleScanner");
    this.setState({ scanner: !this.state.scanner });
  };

  public onQRCodeValidate = (data: string): IQRCodeValidateResponse => {
    const res: IQRCodeValidateResponse = {
      error: null,
      result: null,
    };
    try {
      res.result = data;
    } catch (error) {
      res.error = error;
    }
    
    return res;
  };
  public checkCoupon = async (data:string)=>{
      try{
        const x = ethers.utils.RLP.decode(data);
        const C = await window.couponDappInstance.coupons(x[0]);
        this.setState({
          hash : x[0],signature : x[1],
          coupon : [ethers.utils.formatEther(C[0]),C[1],C[2]]
        })

      }catch(e){
        console.log('Error : ',e);
        this.setState({error : true});
      }
  }
  public onQRCodeScan = async (data: any) => {
    const uri = typeof data === "string" ? data : "";
    if (uri) {
      console.log('Coupon Code', uri);
      
      await this.setState({ uri });
      await this.checkCoupon(uri);
      this.toggleScanner();
    }
  };
  public onQRCodeError = (error: Error) => {
    throw error;
  };

  public onQRCodeClose = () => this.toggleScanner();

  handleScan(result){
    if(result){
      this.setState({ result })
    }
  }
  handleError(err){
    console.error(err)
  } 
  handleImgSubmit() {
    // this.refs.reader.openImageDialog() 
  }

  render = () => (
    <>
     <section className="com-sec-hed">
          <Card className="com-top-space">
              <Card.Body>
                    <h1>Redeem Your Coupon</h1>
                    {!(this.state.coupon.length)?<div className="container text-center m-auto" style={{maxWidth : "400px"}}>
                      {this.state.error ? <Alert variant="danger" style={{ marginTop: '1rem' }}>
                        Invalid QR Code.  try Again
                      </Alert>:null}
                      <Button 
                          block={true}
                          className="create-coupon-button"
                          onClick={()=>this.setState({scanner : true})}
                        > <i className="fa fa-qrcode" aria-hidden="true"></i>{' '} Scan Coupon QR</Button>
                        <div>OR</div>
                        <QrReader
                            ref="reader"
                            delay={300}
                            onError={this.handleError}
                            onScan={this.handleScan}
                            facingMode='user'
                            legacyMode={true}
                          />
                        {/* <input type="button"
                          className="create-coupon-button large" 
                          onClick={this.handleImgSubmit} value=" <i className='fa fa-camera'></i> Upload Coupon QR "
                          /> */}
                        <Button
                          block
                          className="create-coupon-button " 
                          onClick={this.handleImgSubmit}>
                          <i className='fa fa-camera'></i> Upload Coupon QR 
                        </Button>
                          <div>OR</div> 

                        <FormControl
                          value={this.state.uri}
                          onChange={(e)=>this.setState({uri: e.target.value})}
                            placeholder="Enter coupon code" 
                        />
                        <Button
                          block={true}
                          className="create-coupon-button"
                          onClick={ ()=>  this.checkCoupon(this.state.uri)}
                          >Redeem Coupon</Button>
                        
                      </div>:
                      <div className="card text-center m-auto" style={{width: '25rem', border:'2px dashed gray'}}>
                        
                        <img className="m-auto" width="100" src="https://assets.coingecko.com/coins/images/6031/large/era_swap.PNG" alt="logo" />
                        <div className="card-body">
                          <h1 className="card-title">{this.state.coupon[0] || 0}{' '} ES</h1> 
                          <p className="card-text">You can redeem this coupon.</p>
                          <p className="card-text">This Coupon has been generated By {this.state.coupon[2]}</p>
                          {(this.state.coupon[1] === 1) ? <button onClick={this.redeemCoupon} className="btn btn-primary">Redeem Now</button> : null}
                          <hr/>
                          <p className="card-text"><small className="text-muted">Coupon is {this.STATE[this.state.coupon[1]]}</small></p>
                        </div>
                      </div> 

                      
                      }

                      {this.state.scanner && (
                        <QRCodeScanner
                          onValidate={this.onQRCodeValidate}
                          onScan={this.onQRCodeScan}
                          onError={this.onQRCodeError}
                          onClose={this.onQRCodeClose}
                        />
                      )}


                  
              </Card.Body>
          </Card>
     </section>
    
    </>
  );
}
