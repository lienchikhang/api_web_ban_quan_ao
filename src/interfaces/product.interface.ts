
export interface IProductType {
    type_name: string,
}

export interface IProduct {
    product_id: number,
    product_name: string,
    product_desc: string,
    type: {
        type_name: string,
    },
    cate: {
        cate_name: string,
    },
    price: {
        price_num: number
    },
    Images: {
        img_url: string
    }[],
    Product_Sizes: {
        size_id: number,
        size: {
            size_key: string,
        }
    }[],
    Product_Colors: {
        color_id: number,
        color: {
            color_hex: string,
            color_name: string,
        }
    }[]
}

export interface IIncludeCondition {
    model: any,
    attributes: string[],
    as: string,
    where?: {

    }
}

export interface ICondition {
    is_deleted?: number,
    product_id?: {},
    size_key?: string,
    color?: string,
}