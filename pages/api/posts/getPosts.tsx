import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    // Fetch all posts
    try {
      const data = await prisma.post.findMany();
      res.status(200).json(data);
    } catch (err) {
      res
        .status(403)
        .json({ err: 'Error has occurred while fetching all posts.' });
    }
  }
}
