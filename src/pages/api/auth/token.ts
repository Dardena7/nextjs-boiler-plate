import type { NextApiRequest, NextApiResponse } from 'next';
import * as auth0 from '@auth0/nextjs-auth0';

async function getAccessToken(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { accessToken } = await auth0.getAccessToken(req, res);
    res.json({ accessToken });
  } catch (error) {
    res.status(401).json(error);
  }
}

export default getAccessToken;
