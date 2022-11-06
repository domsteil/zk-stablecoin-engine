import { ethers, utils } from 'ethers';
import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'

import BN from 'bn.js';
import { UserFactory } from 'nightfall-sdk';


const clientApiUrl = process.env.APP_CLIENT_API_URL;
const nightfallMnemonic = process.env.APP_NIGHTFALL_MNEMONIC;

export default async function (req, res) {

    try {

      const nightfallUser = await UserFactory.create({clientApiUrl});
      
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
}