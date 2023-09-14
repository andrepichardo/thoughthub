import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import prisma from '../../../prisma/client';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (!session)
      return res
        .status(401)
        .json({ message: 'Please sign in to make a post.' });

    const message: string = req.body.message;

    // Get User
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email },
    });

    // Check message
    if (message.length > 300) {
      return res.status(403).json({ message: 'Please write a shorter post.' });
    }
    if (!message.length) {
      return res
        .status(403)
        .json({ message: 'Please do not leave the post field empty.' });
    }

    // Create Post
    try {
      const result = await prisma.post.create({
        data: {
          message,
          userId: prismaUser.id,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(403).json({ err: 'Error has occurred while making a post.' });
    }
  }
}
