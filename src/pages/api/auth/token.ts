import type { NextApiRequest, NextApiResponse } from 'next';
import * as auth0 from '@auth0/nextjs-auth0';

async function getAccessToken(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log('$$alex AY', req, res);
    const { accessToken } = await auth0.getAccessToken(req, res);
    res.json({ accessToken: accessToken });
  } catch (error) {
    console.log('$$alex ctach', error)
    res.status(401).json(error);
  }
}

export default getAccessToken;
