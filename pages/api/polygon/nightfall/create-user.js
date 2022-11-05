import { ethers, utils } from 'ethers';
import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'
import config from '../../../../lib/nightfall-config'
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

        const nightfallUser = await UserFactory.create({ clientApiUrl, nightfallMnemonic });

        const balances = await checkBalances(nightfallMnemonic);

        console.log(nightfallUser);

        console.log(balances);

        return res.status(200).json({ 'status:': 'created' });

    }

    catch (error) {
        console.log(error);
        return res.status(500).json({
            "error_code": "eth_error",
            "error_message": error.toString ? error.toString() : error
        });
    };
};