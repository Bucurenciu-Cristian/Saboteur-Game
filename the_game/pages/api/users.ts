// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next'

type Data = {
  name: string
  array?: string[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json(
    {name: 'Ioana, hai te rog fa baie azi :))',
      array: ["Kicky", "Ioana","Markus", "Teodor Cuculea"]}
  )
}
