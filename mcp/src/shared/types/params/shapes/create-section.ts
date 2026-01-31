import z from "zod";

export const CreateSectionParamsSchema = z.object({
  name: z.string().describe("Name of the section"),
  x: z.number().describe("X position"),
  y: z.number().describe("Y position"),
  width: z.number().default(400).describe("Width of the section"),
  height: z.number().default(300).describe("Height of the section"),
});

export type CreateSectionParams = z.infer<typeof CreateSectionParamsSchema>;
