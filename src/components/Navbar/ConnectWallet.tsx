import React, { useState, useEffect } from "react";
import { Dropdown, Tooltip, OverlayTrigger } from "react-bootstrap";
import { ethers } from "ethers";
import Swal from "sweetalert2";
import WalletConnectProvider from "@walletconnect/web3-provider";
import copy from "copy-to-clipboard";

export default function ConnectWallet() {
  const [Address, setAddress] = useState("");
  const [detail, setDetail] = useState({ name: "", balance: "" });

  async function resolveUserName(address: string) {
    const name = ethers.utils.parseBytes32String(
      await window.providerESN.call({
        to: "0xe1347dAAffbd3102F6CD67edAEA9dfc8A8C4FaDB",
        data: "0x1f70693c" + ethers.utils.hexZeroPad(address, 32).substring(2),
      })
    );
    return name;
  }

  async function loadDetails() {
    if (window.wallet) {
      let name = "",
        balance = "";
      try {
        name = await resolveUserName(Address);
        console.log("name : ", name);
      } catch (e) {
        console.log(e);
      }
      try {
        balance = ethers.utils.formatEther(
          await window.providerESN.getBalance(Address)
        );
        console.log("balance : ", balance);
      } catch (e) {
        console.log(e);
      }
      setDetail({ name, balance });
    }
  }
  async function loadWallet() {
    try {
      //  Create WalletConnect Provider
      const walletConnectProvider = new WalletConnectProvider({
        rpc: { 5197: "https://mainnet.eraswap.network" },
        // infuraId: "b81341e3ab894360a84f3fa640ab985e" ,
        qrcode: true,
      });
      await walletConnectProvider.enable();
      const provider = new ethers.providers.Web3Provider(walletConnectProvider);
      console.log(provider.getSigner());
      const wallet = await provider.getSigner();
      const address = await wallet.getAddress();
      setAddress(address);
      await loadDetails();
      window.wallet = wallet;
    } catch (e) {
      Swal.fire("Opps !", "Something went wrong. Please try again", "error");
    }
  }

  const loadMetamask = async () => {
    try {
      if (window.ethereum) {
        //@ts-ignore
        window.ethereum.enable();
        const metamaskProvider = new ethers.providers.Web3Provider(
          window.ethereum
        );
        const network = await metamaskProvider.getNetwork();

        console.log(ethers.Wallet);
        const onCorrectNetwork = network.chainId === 5197;
        if (!onCorrectNetwork) {
          alert("please connect to eraswap network ");
        } else {
          const wallet = await metamaskProvider.getSigner();
          console.log("Wallet : ", wallet);
          const address = await wallet.getAddress();
          setAddress(address);
          console.log("Address :", address);
          await loadDetails();

          window.wallet = wallet;
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Opps !", "Something went wrong. Please try again", "error");
    }
  };
  function Wallet() {
    return (
      <div style={{ width: "400px", marginTop: "10px", padding: "15px" }}>
        <p>Use Account From </p>
        <div className="dropdown-divider "></div>
        <div className="row">
          <div className="col-4 text-center  wallet " onClick={loadMetamask}>
            <img
              className="my-1"
              src="https://docs.metamask.io/metamask-fox.svg"
              width="70px"
              alt="metamsak"
            />
            <h6>MetaMask</h6>
          </div>
          <div className="col-4 text-center   wallet " onClick={loadWallet}>
            <img
              src="https://avatars0.githubusercontent.com/u/37784886"
              width="70px"
              alt="walletconnect"
            />
            <h6>WalletConnect</h6>
          </div>
          <div
            className="col-4 text-center wallet "
            onClick={() =>
              window.open(
                "https://eraswap.life/access-my-wallet",
                "",
                "width=1001,height=650"
              )
            }
          >
            <img
              className="my-3"
              src="https://ipfs.eraswap.cloud/ipfs/QmcfYykQcK3r4gABeU4f7vnRVHdYW4yhPS3dzkG4QRaFEX"
              width="70px"
              alt="eraswap"
            />
            <h6>EraSwap.life</h6>
          </div>
        </div>
        <div className="dropdown-divider "></div>
        <a
          href="https://eraswap.life/create-new-wallet"
          target="_blank"
          rel="noopener noreferrer"
        >
          Don’t have an Ethereum account?
        </a>
      </div>
    );
  }

  const renderTooltip = (props) => (
    <Tooltip id="tooltip-top" {...props}>
      Copy
    </Tooltip>
  );
  function Account() {
    return (
      <div style={{ width: "400px", marginTop: "10px", padding: "15px" }}>
        <p>ACTIVE ACCOUNT</p>
        <div className="dropdown-divider "></div>
        <OverlayTrigger placement="top" overlay={renderTooltip}>
          <i
            className="fa fa-clone"
            style={{ marginLeft: 8, float: "right", fontSize: "1.5em" }}
            onClick={() => {
              copy(Address);
            }}
          ></i>
        </OverlayTrigger>
        <p>
          <i className="fa fa-dot-circle-o text-success"></i> You are Connected
          with : {Address}
        </p>
        <div className="dropdown-divider "></div>
        <div>
          <b>Name : </b> {detail.name || "No KYC done"}
        </div>
        <div>
          <b>Balance : </b> {detail.balance} ES
        </div>
        <div className="dropdown-divider "></div>
        <button
          type="button"
          className="btn btn-outline-danger btn-block"
          onClick={() => {
            window.wallet = undefined;
            setAddress(null);
          }}
        >
          DisConnect
        </button>
      </div>
    );
  }
  function CustomWallets(e) {
    setTimeout(() => {
      const message = e.data;
      if (message.substring) {
        if (message.substring(0, 2) === "0x") {
          window.wallet = new ethers.Wallet(message).connect(
            window.providerESN
          );
          setAddress(window.wallet?.address);
        }
      }
    }, 0);
  }
  // ( async () =>
  // { if(window.wallet){
  //    if( (window.wallet.address))setAddress( (window.wallet.address));
  //    else setAddress( (await window.wallet.getAddress()));
  //  }})();

  useEffect(() => {
    window.addEventListener("message", (e) => {
      CustomWallets(e);
    });
    (async () => {
      if (Address) await loadDetails();
    })();

    return () => {
      window.removeEventListener("message", (e) => {
        CustomWallets(e);
      });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Address]);

  // useEffect(()=>{
  //   (async ()=>{ await loadMetamask()})();

  // },[ ])
  return (
    <React.Fragment>
      <Dropdown className="navbar-element">
        <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
          {!Address ? (
            "Connect to Wallet"
          ) : (
            <>
              <i className="fa fa-circle text-success"></i>&nbsp;
              {Address.slice(0, 10)}....{Address.slice(38)}
            </>
          )}
        </Dropdown.Toggle>
        <Dropdown.Menu align="right">
          {!Address ? <Wallet /> : <Account />}
        </Dropdown.Menu>
      </Dropdown>
    </React.Fragment>
  );
}
