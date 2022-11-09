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

    var address = req.body.address;

    await cors(req, res)

    let provider = new ethers.providers.EtherscanProvider("homestead");

    try {

        let history = await provider.getHistory(address);
        let data = history.reverse();

        return res.status(200).json({ data })

    }

    catch (error) {
        console.log(error);
        return res.status(500).json({
            "error_code": "eth_error",
            "error_message": error.toString ? error.toString() : error
        });
    };

}