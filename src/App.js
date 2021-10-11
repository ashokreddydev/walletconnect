import React from "react";
import "./styles.css";
import "antd/dist/antd.css";
import { Button } from "antd";

import Web3 from "web3";
import Web3Modal from "web3modal";
import Portis from "@portis/web3";
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  portis: {
    package: Portis, // required
    options: {
      id: "8e23465f-c9a7-410a-92df-18b2e3d1c38f",
      network: "maticMumbai"
    }
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "27e484dcd9e3efcfd25a83a78777cdf1"
    }
  }
};

let provider = null;
let web3 = null;
let accounts = null;

export default function App() {
  async function showPortis() {
    if (!provider) {
      const web3Modal = new Web3Modal({
        cacheProvider: true, // optional
        providerOptions // required
      });
      web3 = await connect(web3Modal);
    }

    provider._portis.showPortis();

    if (!accounts) {
      accounts = await web3.eth.getAccounts();
      print(`Wallet address: ${accounts[0].toLowerCase()}`);
    }
  }

  async function connect(web3Modal) {
    provider = await web3Modal.connect();
    return new Web3(provider);
  }

  function print(str) {
    const p = document.createElement("p");
    p.innerText = str;
    document.getElementById("userWalletAddress").appendChild(p);
  }

  return (
    <div className="App">
      <h1>Hello ETH India Hackers!</h1>
      <h2>A basic example of using web3modal with Portis</h2>

      <div className="showPortisBtn">
        <Button type="primary" onClick={() => showPortis()}>
          Show Portis
        </Button>
      </div>
      <pre id="userWalletAddress"></pre>
      <h3>
        Make sure you switch out the `id` parameter in the Portis provider
        options for the one you created for your DApp in the{" "}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://dashboard.portis.io"
        >
          Portis Dashboard
        </a>
      </h3>
    </div>
  );
}
