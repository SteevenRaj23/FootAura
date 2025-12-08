const { ethers } = require("ethers");
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

exports.verifyGanachePayment = async (req, res) => {
  try {
    const { txHash, amount, orderId } = req.body;

    const tx = await provider.getTransaction(txHash);
    if (!tx) return res.status(400).json({ message: "Invalid transaction hash" });

    // Check receiver
    if (tx.to.toLowerCase() !== process.env.BUSINESS_WALLET.toLowerCase()) {
      return res.status(400).json({ message: "Wrong receiver address" });
    }

    // Check value
    const paidEth = Number(ethers.formatEther(tx.value));
    console.log("Paid ETH:", paidEth, "Expected ETH:", amount);
    if (paidEth < amount) {
      return res.status(400).json({ message: "Underpaid" });
    }

    // Confirm transaction
    const receipt = await provider.waitForTransaction(txHash, 1);

    if (receipt.status !== 1)
      return res.status(400).json({ message: "Transaction failed" });

    res.json({ message: "Ganache payment verified!", txHash });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
