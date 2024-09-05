import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const topicRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ title: z.string().min(2) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.topic.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
        },
      });
    }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    const topics = await ctx.db.topic.findMany({
      where: { userId: ctx.session.user.id },
    });

    return topics ?? null;
  }),
  udate: protectedProcedure
    .input(z.object({ title: z.string().min(2), id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.topic.update({
        where: { id: input.id },
        data: {
          title: input.title,
        },
      });
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.topic.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
