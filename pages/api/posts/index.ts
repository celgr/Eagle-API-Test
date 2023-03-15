import type { NextApiRequest, NextApiResponse } from 'next'

const requestOptions: object = {
  method: 'GET',
  redirect: 'follow'
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch("http://localhost:41595/api/item/list", requestOptions)
  const result = await response.json()
  const posts = await result.data

  res.status(200).json({ posts })
}