// export async function payment(amountInMatic) {
//   if (!window.ethereum) {
//     alert("MetaMask not installed");
//     return;
//   }

//   // 1️⃣ Request wallet
//   const accounts = await window.ethereum.request({
//     method: "eth_requestAccounts",
//   });

//   // 2️⃣ Ensure user is on Mumbai testnet
//   const chainId = await window.ethereum.request({ method: "eth_chainId" });
//   if (chainId !== "0x13881") {           // Mumbai chain ID = 0x13881
//     await window.ethereum.request({
//       method: "wallet_switchEthereumChain",
//       params: [{ chainId: "0x13881" }],
//     });
//   }

//   // 3️⃣ Send payment
//   const txHash = await window.ethereum.request({
//     method: "eth_sendTransaction",
//     params: [
//       {
//         from: accounts[0],
//         to: "0xYOUR_TEST_WALLET",
//         value: `0x${(amountInMatic * 1e18).toString(16)}`,
//       },
//     ],
//   });

//   return txHash;
// }


export async function payment(amountEth) {
  if (!window.ethereum) return alert("MetaMask not installed!");

  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts"
  });

      // console.log(accounts)

  // Ensure you are on Ganache chain 1337
  const chainId = await window.ethereum.request({ method: "eth_chainId" });

  if (chainId !== "0x539") {  // 1337 in hex = 0x539
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x539" }],
    });
  }

  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [
      {
        from: accounts[0],
        to: "0xEe4c19DFc077335cDc6a59c7D0F50946760BA01B",
        value: "0x" + (amountEth * 1e18).toString(16)
      }
    ],
  });

  return txHash;
}


export async function usdToEth(usdAmount) {
  if (usdAmount <= 0) throw new Error("usdAmount must be > 0");

  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
    { headers: { "accept": "application/json" } }
  );
  if (!res.ok) throw new Error(`Price fetch failed: ${res.status}`);
  const data = await res.json();

  const priceUsdPerEth = data?.ethereum?.usd;
  if (!priceUsdPerEth) throw new Error("Invalid price response");

  const ethAmount = usdAmount / priceUsdPerEth;
  return ethAmount; // ETH
}