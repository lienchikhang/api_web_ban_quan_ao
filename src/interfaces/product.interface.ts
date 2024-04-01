
export interface IProductType {
    type_name: string,
}

export interface IProduct {
    product_id: number,
    product_name: string,
    product_desc: string,
    type?: {
        type_name: string,
    },
    cate?: {
        cate_name: string,
    },
    price?: {
        price_num: number
    },
    Images?: {
        img_url: string
    }[],
    Product_Sizes?: {
        size_id: number,
        size: {
            size_key: string,
        }
    }[],
    Product_Colors?: {
        color_id: number,
        color: {
            color_hex: string,
            color_name: string,
        }
    }[]
}

export interface IProductAll {
    product_id: number,
    product_name: string,
    product_desc: string,
    Prices?: {
        price_num: number
    },
    Images?: {
        img_url: string
    }[],
    Product_Size?: {
        Sizes?: {
            size_id: number,
            size_key: string,
        }
    }[],
    Product_Colors?: {
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

export interface IDefaultSelect {
    product_id: boolean,
    product_name: boolean,
    product_desc: boolean,
    Prices: {
        select?: {},
        include?: {},
        where?: {},
    },
    Images: {
        select?: {},
        include?: {},
        where?: {},
    },
    Product_Size?: {
        select?: {},
        include?: {},
        where?: {},
    },
    Product_Color?: {
        select?: {},
        include?: {},
        where?: {},
    }
}

export interface IDefaultWhere {
    is_deleted: boolean,
    product_id: {},
    Product_Size?: {},
    Product_Color?: {},
    Types?: {},
    Categories?: {},
}