import { eq } from "drizzle-orm";
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  updateUserName: protectedProcedure
    .input(z.object({ name: z.string().min(1), field: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(users)
        .set({
          name: input.name,
        })
        .where(eq(users.id, ctx.session.user.id));
    }),
    updateUserImage: protectedProcedure
    .input(z.object({ image: z.string(), field: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(users)
        .set({
          image: input.image,
        })
        .where(eq(users.id, ctx.session.user.id));
    }),
});
