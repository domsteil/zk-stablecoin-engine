import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'
import { withAuth } from '@clerk/nextjs/api';
import { UserFactory } from 'nightfall-sdk';

// Initialize the cors middleware
const cors = initMiddleware(
    // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
    Cors({
        // Only allow requests with GET, POST and OPTIONS
        origin: "*",
        methods: ['GET', 'POST', 'OPTIONS'],
    })
)

const clientApiUrl = process.env.APP_CLIENT_API_URL;
const nightfallMnemonic = process.env.APP_NIGHTFALL_MNEMONIC;

export default withAuth(async (req, res) => {

    if (req.auth.sessionId) {

        try {

            const nightfallUser = await UserFactory.create({ clientApiUrl, nightfallMnemonic });

            // Check the balances of the current user
            const balance = await nightfallUser.checkNightfallBalances();

            if (Object.keys(balance).length) {

                const balanceWei = Object.values(balance)[0][0].balance;

                const receiver_balance = balanceWei;

                var number = receiver_balance;

                var formatted_number = number / 1000000;

                var float_number = formatted_number.toFixed(2);

                return res.status(200).json({ usdc_balance: float_number })
            }

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
