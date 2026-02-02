import z from "zod";

export const SetTextContentParamsSchema = z.object({ nodeId: z.string(), text: z.string() });
export type SetTextContentParams = z.infer<typeof SetTextContentParamsSchema>;

export const SetFontFamilyParamsSchema = z.object({ nodeId: z.string(), family: z.string() });
export type SetFontFamilyParams = z.infer<typeof SetFontFamilyParamsSchema>;

export const SetFontSizeParamsSchema = z.object({ nodeId: z.string(), size: z.number().min(1) });
export type SetFontSizeParams = z.infer<typeof SetFontSizeParamsSchema>;

export const SetFontWeightParamsSchema = z.object({ nodeId: z.string(), weight: z.enum(["Thin", "ExtraLight", "Light", "Regular", "Medium", "SemiBold", "Bold", "ExtraBold", "Black"]) });
export type SetFontWeightParams = z.infer<typeof SetFontWeightParamsSchema>;

export const SetTextAlignParamsSchema = z.object({ nodeId: z.string(), align: z.enum(["LEFT", "CENTER", "RIGHT", "JUSTIFIED"]) });
export type SetTextAlignParams = z.infer<typeof SetTextAlignParamsSchema>;

export const SetVerticalAlignParamsSchema = z.object({ nodeId: z.string(), align: z.enum(["TOP", "CENTER", "BOTTOM"]) });
export type SetVerticalAlignParams = z.infer<typeof SetVerticalAlignParamsSchema>;

export const SetLineHeightParamsSchema = z.object({ nodeId: z.string(), value: z.number().min(0), unit: z.enum(["PIXELS", "PERCENT", "AUTO"]).default("PIXELS") });
export type SetLineHeightParams = z.infer<typeof SetLineHeightParamsSchema>;

export const SetLetterSpacingParamsSchema = z.object({ nodeId: z.string(), value: z.number(), unit: z.enum(["PIXELS", "PERCENT"]).default("PIXELS") });
export type SetLetterSpacingParams = z.infer<typeof SetLetterSpacingParamsSchema>;

export const SetParagraphSpacingParamsSchema = z.object({ nodeId: z.string(), spacing: z.number().min(0) });
export type SetParagraphSpacingParams = z.infer<typeof SetParagraphSpacingParamsSchema>;

export const SetTextCaseParamsSchema = z.object({ nodeId: z.string(), textCase: z.enum(["ORIGINAL", "UPPER", "LOWER", "TITLE"]) });
export type SetTextCaseParams = z.infer<typeof SetTextCaseParamsSchema>;

export const SetTextDecorationParamsSchema = z.object({ nodeId: z.string(), decoration: z.enum(["NONE", "UNDERLINE", "STRIKETHROUGH"]) });
export type SetTextDecorationParams = z.infer<typeof SetTextDecorationParamsSchema>;

export const SetTextAutoResizeParamsSchema = z.object({ nodeId: z.string(), mode: z.enum(["NONE", "WIDTH_AND_HEIGHT", "HEIGHT", "TRUNCATE"]) });
export type SetTextAutoResizeParams = z.infer<typeof SetTextAutoResizeParamsSchema>;

export const SetTextTruncationParamsSchema = z.object({ nodeId: z.string(), truncation: z.enum(["DISABLED", "ENDING"]) });
export type SetTextTruncationParams = z.infer<typeof SetTextTruncationParamsSchema>;

export const SetListTypeParamsSchema = z.object({ nodeId: z.string(), listType: z.enum(["NONE", "ORDERED", "UNORDERED"]) });
export type SetListTypeParams = z.infer<typeof SetListTypeParamsSchema>;

export const SetHyperlinkParamsSchema = z.object({ nodeId: z.string(), url: z.string(), start: z.number().optional(), end: z.number().optional() });
export type SetHyperlinkParams = z.infer<typeof SetHyperlinkParamsSchema>;

export const SetRangeStyleParamsSchema = z.object({ nodeId: z.string(), start: z.number(), end: z.number(), bold: z.boolean().optional(), italic: z.boolean().optional(), color: z.string().optional() });
export type SetRangeStyleParams = z.infer<typeof SetRangeStyleParamsSchema>;

export const GetAvailableFontsParamsSchema = z.object({});
export type GetAvailableFontsParams = z.infer<typeof GetAvailableFontsParamsSchema>;

export const LoadFontParamsSchema = z.object({ family: z.string(), style: z.string().default("Regular") });
export type LoadFontParams = z.infer<typeof LoadFontParamsSchema>;

export const GetTextStylesParamsSchema = z.object({ nodeId: z.string() });
export type GetTextStylesParams = z.infer<typeof GetTextStylesParamsSchema>;

export const ApplyTextStyleParamsSchema = z.object({ nodeId: z.string(), styleId: z.string() });
export type ApplyTextStyleParams = z.infer<typeof ApplyTextStyleParamsSchema>;
