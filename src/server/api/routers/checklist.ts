import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const checklistRouter = createTRPCRouter({
  createList: protectedProcedure
    .input(z.object({ name: z.string().min(1), items: z.array(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.checklist.create({
        data: {
          name: input.name,
          checklistItems: {
            create: input.items.map((item) => ({ name: item })),
          },
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

    getLists: protectedProcedure.query(async ({ ctx }) => {
        const lists = await ctx.db.checklist.findMany({
            where: { createdBy: { id: ctx.session.user.id } },
            include: { checklistItems: true },
        });
    
        return lists ?? null;
    })
});
