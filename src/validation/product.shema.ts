import * as z from "zod";

const ProductSchema = z.object({
    name: z.string().trim().min(1, { message: "Tên không được để trống" }),
    price: z.number().min(1, { message: "Giá tiền tôí thiểu là 1" }),
    detailDesc: z.string().trim().min(1, { message: "detailDesc không được để trống" }),
    shortDesc: z.string().trim().min(1, { message: "shortDesc không được để trống" }),
    quantity: z.number().min(1, { message: "Quantity tôí thiểu là 1" }),
    factory: z.string().trim().min(1, { message: "Factory không được để trống" }),
    target: z.string().trim().min(1, { message: "Target không được để trống" }),

})

type TProductSchema = z.infer<typeof ProductSchema>;

export {
    ProductSchema,
    TProductSchema
}