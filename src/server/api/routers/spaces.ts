import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const spacesRouter = createTRPCRouter({
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const space = await ctx.db.query.twitterSpaces.findFirst({
        where: (spaces, { eq }) => eq(spaces.id, input.id),
      });

      if (!space) {
        throw new Error("Twitter Space not found");
      }

      return space;
    }),
});
