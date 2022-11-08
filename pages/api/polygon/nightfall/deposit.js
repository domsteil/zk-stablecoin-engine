import { ethers, utils } from 'ethers';
import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'
import BN from 'bn.js';
import { UserFactory } from 'nightfall-sdk';

import { withAuth } from '@clerk/nextjs/api';

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    origin: "*",
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

const clientApiUrl = process.env.APP_CLIENT_API_URL;
const nightfallMnemonic = process.env.APP_NIGHTFALL_MNEMONIC;
const erc20ContractAddress = process.env.ERC20_CONTRACT_ADDRESS;

export default withAuth(async (req, res) => {

  const erc20value = req.body.amount;

  await cors();

  if (req.auth.sessionId) {

    try {

      // Create a user to deposit funds
      const nightfallUser = await UserFactory.create({
        clientApiUrl,
        nightfallMnemonic,
      });

      // Make a deposit for the user
      const txReceipts = await nightfallUser.makeDeposit({
        tokenContractAddress: erc20ContractAddress,
        value: erc20value,
      });

      console.log(txReceipts);

      return res.status(200).json(`Deposited ${ethers.utils.formatUnits(erc20value, 6)} USDC to ${erc20ContractAddress}`)

    }

    catch (error) {
      console.log(error);
      return res.status(500).json({
        "error_code": "eth_error",
        "error_message": error.toString ? error.toString() : error
      });
    };

  } else {
    res.status(401).json({ id: null });
  }

});
