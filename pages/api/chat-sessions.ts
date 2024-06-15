import prisma from '@/lib/db';

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    try {
      const chatSessions = await prisma.chatSession.findMany();
      res.status(200).json(chatSessions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch chat sessions' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
