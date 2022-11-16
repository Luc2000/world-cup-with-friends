// pages/api/post/index.ts
import { GameUsers } from "@prisma/client";
import prisma from "../../../lib/prismadb";

// POST /api/post
export default async function handle(
  req: {
    body: { id: string; email: string; userName: string; userPhoto: string };
  },
  res: {
    status: (arg0: number) => {
      (): any;
      new (): any;
      end: { (arg0: string): any; new (): any };
    };
    json: (arg0: GameUsers) => void;
  }
) {
  const { id, email, userName, userPhoto } = req.body;

  //Aqui eu preciso arrumar para incluir o id do game tb
  const alreadyRegistered = await prisma.gameUsers.findFirst({
    where: {
      userMail: email,
      gameId: id,
    },
  });

  if (alreadyRegistered) return res.status(400).end("Usuário já cadastrado");

  const result = await prisma.gameUsers.create({
    data: {
      gameId: id,
      userMail: email,
      userName: userName,
      userPhoto: userPhoto,
    },
  });
  res.json(result);
}
