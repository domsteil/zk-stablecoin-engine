import { ethers, utils } from 'ethers';
import Cors from 'cors'
import initMiddleware from '../../../../lib/init-middleware'
import config from '../../../../lib/nightfall-config'
import BN from 'bn.js';
import { UserFactory } from 'nightfall-sdk';


const clientApiUrl = config.clientApiUrl;
const nightfallMnemonic = config.nightfallMnemonic;

export default async function (req, res) {

async function createUserFirstTime() {

    try {

      const nightfallUser = await UserFactory.create({clientApiUrl});
      
      // move to clerk secrets or database with posgres
      
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
}