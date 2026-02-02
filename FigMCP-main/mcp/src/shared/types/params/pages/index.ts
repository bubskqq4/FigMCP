import z from "zod";

export const GetDocumentPagesParamsSchema = z.object({ currentOnly: z.boolean().default(false) });
export type GetDocumentPagesParams = z.infer<typeof GetDocumentPagesParamsSchema>;

export const CreatePageParamsSchema = z.object({ name: z.string() });
export type CreatePageParams = z.infer<typeof CreatePageParamsSchema>;

export const DeletePageParamsSchema = z.object({ pageId: z.string() });
export type DeletePageParams = z.infer<typeof DeletePageParamsSchema>;

export const RenamePageParamsSchema = z.object({ pageId: z.string(), name: z.string() });
export type RenamePageParams = z.infer<typeof RenamePageParamsSchema>;

export const DuplicatePageParamsSchema = z.object({ pageId: z.string() });
export type DuplicatePageParams = z.infer<typeof DuplicatePageParamsSchema>;

export const SetCurrentPageParamsSchema = z.object({ pageId: z.string() });
export type SetCurrentPageParams = z.infer<typeof SetCurrentPageParamsSchema>;
