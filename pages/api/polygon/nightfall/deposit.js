import { ethers, utils } from 'ethers';
import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'
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

export default async function (req, res) {

    await cors()

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
        };