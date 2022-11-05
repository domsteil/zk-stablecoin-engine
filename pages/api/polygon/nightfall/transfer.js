import { ethers, utils } from 'ethers';
import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'
import config from '../../../../lib/nightfallConfig'
import BN from 'bn.js';
import { UserFactory } from 'nightfall-sdk';


// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    origin: "*",
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);


const clientApiUrl = config.clientApiUrl;
const nightfallMnemonic = config.nightfallMnemonic;

export default async function (req, res) {

  await cors();

  try {

    // Create a user that will transfer funds
    const nightfallUserSender = await UserFactory.create({
      clientApiUrl,
      nightfallMnemonic,
    });

    // Create a user that will recieve funds
    const nightfallUserRecepient = await UserFactory.create({
      clientApiUrl,
    });

    // Recepient Address
    const recepientAddress = nightfallUserRecepient.getNightfallAddress();

    // Make a transfer to the Nightfall address of the recipient
    const txReceipts = await nightfallUserSender.makeTransfer({
      tokenContractAddress: erc20ContractAddress,
      value: erc20value,
      recipientNightfallAddress: recepientAddress,
      isOffChain: false,
    });

    console.log(txReceipts);

    return res.status(200).json(`Sent ${ethers.utils.formatUnits(value, 6)} USDC to ${recepientAddress}`)

  }

  catch (error) {
    console.log(error);
    return res.status(500).json({
      "error_code": "eth_error",
      "error_message": error.toString ? error.toString() : error
    });
  };
};