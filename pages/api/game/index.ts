// pages/api/post/index.ts
import { GameUsers } from "@prisma/client";
import prisma from "../../../lib/prismadb";

// GET api/game
export default async function handle(
  req: { query: { id: number } },
  res: { json: (arg0: GameUsers[]) => void }
) {
  const { id } = req.query;

  const result = await prisma.gameUsers.findMany({
    where: {
      gameId: id,
    },
  });

  res.json(result);
}
