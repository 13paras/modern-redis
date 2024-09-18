import { z } from "zod";

const ReviewSchema = z.object({
  review: z.string().min(1),
  rating: z.number().min(1).max(5),
});

type Review = z.infer<typeof ReviewSchema>;

export type { Review };
export { ReviewSchema };
