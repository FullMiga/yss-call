import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import z from "zod";
import { buildNextAuthOption } from "../auth/[...nextauth].api";

const updateProfileShema = z.object({
  bio: z.string()
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).end()
  }

  const session = await getServerSession(req, res, buildNextAuthOption(req, res))

  if (!session) {
    return res.status(401).end()
  }

  const { bio } = updateProfileShema.parse(req.body);

  await prisma.user.update({
    where: {
      id: session.user.id
    },
    data: {
      bio
    }
  })

  return res.status(204).end()
}