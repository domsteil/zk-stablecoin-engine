import { ethers, utils } from 'ethers';
import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'
import { withAuth } from '@clerk/nextjs/api';
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

const clientApiUrl = process.env.APP_CLIENT_API_URL;
const nightfallMnemonic = process.env.APP_NIGHTFALL_MNEMONIC;


export default withAuth(async (req, res) => {

  if (req.auth.sessionId) {

    try {

      const nightfallUser = await UserFactory.create({ clientApiUrl });
      
      if (nightfallUser) {
        localStorage.setItem("userAddress", nightfallUser.ethAddress);
        localStorage.setItem(
          "nightfallUserAddress",
          nightfallUser.zkpKeys.compressedZkpPublicKey,
        );

        localStorage.setItem(
          "nightfallMnemonic",
          nightfallUser.nightfallMnemonic,
        );

        localStorage.setItem("clientApiUrl", nightfallUser.client.apiUrl);
      }

      return nightfallUser;
      
    } catch (error) {
      console.log(error);
    }
    
  } else {
    res.status(401).json({ id: null });
  }

});
