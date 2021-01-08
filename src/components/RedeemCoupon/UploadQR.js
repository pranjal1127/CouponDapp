import React, { Component } from "react";
import QrReader from "react-qr-reader";

export default class UploadQR extends Component {

    constructor(props){
        super(props)
        this.state = {
            delay: 100,
            result: 'No result',
        }

        this.handleScan = this.handleScan.bind(this)
    }
    handleScan(data){
      this.props.onScan(data);
        this.setState({
            result: data,
        })
    }
    handleError(err){
        console.error(err)
    }
    openImageDialog() {
        this.refs.qrReader1.openImageDialog()
    }

    render(){
        const previewStyle = {
            height: 240,
            width: 320,
        }

        return(
            <div>
                <QrReader ref="qrReader1"
                    delay={this.state.delay}
                    previewStyle={previewStyle}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    legacyMode={true}
                />
                <span className="btn btn-primary create-coupon-button large btn-block ">
                  <i className='fa fa-upload'></i>
                  <input  type="button" value=" Submit QR Code" onClick={this.openImageDialog.bind(this)} />
                </span>
                <p>{this.state.result}</p>
            </div>
        )
    }
}