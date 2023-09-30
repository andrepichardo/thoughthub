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
    if (!session) return res.status(401).json({ message: 'Please sign in.' });
    // Get User
    const prismaUser = await prisma.user.findUnique({
      where: { email: session?.user?.email || undefined },
    });

    // Add a comment
    try {
      const { comment, postId } = req.body.data;

      // Check comment
      if (comment.length > 300) {
        return res
          .status(403)
          .json({ message: 'Please write a shorter post.' });
      }
      if (!comment.length) {
        return res
          .status(403)
          .json({ message: 'Please do not leave the field empty.' });
      }
      const result = await prisma.comment.create({
        data: {
          comment: comment,
          userId: prismaUser?.id as string,
          postId,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res
        .status(403)
        .json({ err: 'Error has occurred while getting auth users posts.' });
    }
  }
}
