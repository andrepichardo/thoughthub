import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(401).json({ message: 'Please sign in.' });

    const { message, postId } = req.body.data;

    // Update Post
    try {
      const updatedPost = await prisma.post.update({
        where: { id: postId },
        data: { message: message },
      });

      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json({ message: 'Error updating post' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
