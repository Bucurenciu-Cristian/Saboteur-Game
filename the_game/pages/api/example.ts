// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    res.status(200).json({ name: 'POST request' });
  } else if (req.method === 'GET') {
    // res.status(200).json(exampleData);
  } else if (req.method === 'PUT') {
    res.status(200).json({ name: 'PUT request' });
  } else if (req.method === 'DELETE') {
    res.status(200).json({ name: 'DELETE request' });
  }
}
