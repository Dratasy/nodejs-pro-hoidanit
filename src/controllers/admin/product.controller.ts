import { Request, Response } from 'express';
import { ProductSchema, TProductSchema } from 'src/validation/product.shema';

const getAdminCreateProductPage = async (req: Request, res: Response) => {
    const errors = []
    const oldData = {
        name: "", price: "", detailDesc: "", shortDesc: "", quantity: "", factory: "", target: ""
    }
    return res.render(`admin/product/create.ejs`, {
        errors, oldData
    });
}

const postAdminCreateProduct = async (req: Request, res: Response) => {
    const { name, price, detailDesc, shortDesc, quantity, factory, target } = req.body as TProductSchema;

    const validate = ProductSchema.safeParse(req.body);
    if (!validate.success) {
        const errorsZod = validate.error.issues;
        const errors = errorsZod?.map(item => `${item.path[0]}: ${item.message}`);
        const oldData = {
            name, price, detailDesc, shortDesc, quantity, factory, target
        }

        return res.render(`admin/product/create.ejs`, {
            errors, oldData
        });
    }


    return res.redirect('/admin/product');
}

export {
    getAdminCreateProductPage, postAdminCreateProduct
}

