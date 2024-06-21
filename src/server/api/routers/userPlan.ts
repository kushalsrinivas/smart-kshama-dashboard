import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { userPlan, users } from "~/server/db/schema";

export const userPlanRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        planId: z.string(),
        startDate: z.date(),
        endDate: z.date(),
        transactionId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(userPlan).values({
        ...input,
        createdAt: new Date(),
        userId: ctx.session.user.id,
      });
    }),

  getPlanByUser: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;
    return ctx.db.query.userPlan.findMany({
      where: eq(users.id, userId),
    });
  }),
});
