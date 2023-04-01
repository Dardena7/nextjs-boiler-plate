import type { NextApiRequest, NextApiResponse } from 'next';
import * as auth0 from '@auth0/nextjs-auth0';

async function getAccessToken(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { accessToken } = await auth0.getAccessToken(req, res);
    res.json({ accessToken });
  } catch (error: any) {
    if (error.code === 'ERR_MISSING_SESSION') return res.json({accessToken: undefined})
    res.status(401).json(error);
  }
}

export default getAccessToken;
