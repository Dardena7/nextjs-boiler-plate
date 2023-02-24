import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const response = await axios.post(process.env.MANAGEMENT_TOKEN_URL as string, {
    "grant_type": "client_credentials",
    "client_id": process.env.MANAGEMENT_CLIENT_ID,
    "client_secret": process.env.MANAGEMENT_CLIENT_SECRET,
    "audience": process.env.MANAGEMENT_AUDIENCE
  });
  res.status(200).json({ accessToken: response?.data?.access_token})
}

export default handler;