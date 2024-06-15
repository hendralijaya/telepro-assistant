import prisma from '@/lib/db';

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      const chatSessionId = req.query.id;
      const messages = await prisma.message.findMany({
        where: {
          chatSessionId: chatSessionId,
        },
      });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
