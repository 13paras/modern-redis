import { z } from "zod";

const RestaurantSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  cuisine: z.array(z.string().min(1)),
});

const RestaurantDetailsSchema = z.object({
  links: z.array(
    z.object({
      name: z.string().min(1),
      url: z.string().min(1),
    })
  ),
  contact: z.object({
    phone: z.string().min(1),
    email: z.string().email(),
  }),
});

// Here we are declaring the types for the schema, with this now typescript knows the type of the schema and will also help in autocompletion and error handling

type Restaurant = z.infer<typeof RestaurantSchema>;
type RestaurantDetails = z.infer<typeof RestaurantDetailsSchema>;

export type { Restaurant, RestaurantDetails };

export { RestaurantSchema, RestaurantDetailsSchema };
