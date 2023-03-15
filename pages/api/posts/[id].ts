import fs from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next'

const requestOptions: object = {
  method: 'GET',
  redirect: 'follow'
};

const baseUrl = process.env.BASEURL

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const response = await fetch("http://localhost:41595/api/item/list?limit=50", requestOptions)
  const result = await response.json()
  const posts = await result.data

  const { query } = req;
  const { id } = query;
  const filtered = posts.filter((p: { id: string }) => p.id === id);

  const filteredId = filtered[0].id
  const filteredName = filtered[0].name
  const filteredExt = filtered[0].ext

  let filepath = baseUrl + filteredId + '.info/' + filteredName + '.' + filteredExt

  const data = fs.readFileSync(filepath);

  return res.status(200).send(data);
}