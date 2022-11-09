import { ethers } from "ethers";
import Cors from 'cors'
import initMiddleware from '../../../lib/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    origin: "*",
    methods: ['GET', 'POST', 'OPTIONS'],
  })
)


export default async function (req, res) {

var token = req.headers.authorization; 
var address = req.body.address;

await cors(req, res)

const provider = new ethers.providers.InfuraProvider("homestead", process.env.INFURA_KEY);

const EUROC_ETHEREUM_MAINNET_CONTRACT = process.env.EUROC_ETHEREUM_MAINNET_CONTRACT;

const EUROC_SENDER_PRIVATE_KEY = process.env.EUROC_SENDER_PRIVATE_KEY;

const getEUROCBalance = async (wallet) => {
    const abi = [
      {
        name: 'balanceOf',
        type: 'function',
        inputs: [
          {
            name: '_owner',
            type: 'address',
          },
        ],
        outputs: [
          {
            name: 'balance',
            type: 'uint256',
          },
        ],
        constant: true,
        payable: false,
      },
    ];

    const contract = new ethers.Contract(EUROC_ETHEREUM_MAINNET_CONTRACT, abi, wallet);
    const balance = await contract.balanceOf(wallet.address);

    return balance
  }

// Get the EUROC balance for an account...
try {
    
const receiver_wallet = new ethers.Wallet(EUROC_SENDER_PRIVATE_KEY, provider);
const receiver_balance = await getEUROCBalance(receiver_wallet);

console.log(receiver_balance);

var number = receiver_balance.toNumber();
var formatted_number = number / 1000000;
var float_number = formatted_number.toFixed(2);

return res.status(200).json({ euroc_balance: float_number })

}

catch (error) {
    console.log(error);
    return res.status(500).json({
      "error_code": "eth_error",
      "error_message": error.toString ? error.toString() : error
    });
  };

}