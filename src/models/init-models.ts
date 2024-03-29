import type { Sequelize } from "sequelize";
import { CartDetail as _CartDetail } from "./CartDetail";
import type { CartDetailAttributes, CartDetailCreationAttributes } from "./CartDetail";
import { Carts as _Carts } from "./Carts";
import type { CartsAttributes, CartsCreationAttributes } from "./Carts";
import { Categories as _Categories } from "./Categories";
import type { CategoriesAttributes, CategoriesCreationAttributes } from "./Categories";
import { Colors as _Colors } from "./Colors";
import type { ColorsAttributes, ColorsCreationAttributes } from "./Colors";
import { Images as _Images } from "./Images";
import type { ImagesAttributes, ImagesCreationAttributes } from "./Images";
import { OrderDetail as _OrderDetail } from "./OrderDetail";
import type { OrderDetailAttributes, OrderDetailCreationAttributes } from "./OrderDetail";
import { Orders as _Orders } from "./Orders";
import type { OrdersAttributes, OrdersCreationAttributes } from "./Orders";
import { Prices as _Prices } from "./Prices";
import type { PricesAttributes, PricesCreationAttributes } from "./Prices";
import { Product_Color as _Product_Color } from "./Product_Color";
import type { Product_ColorAttributes, Product_ColorCreationAttributes } from "./Product_Color";
import { Product_Size as _Product_Size } from "./Product_Size";
import type { Product_SizeAttributes, Product_SizeCreationAttributes } from "./Product_Size";
import { Products as _Products } from "./Products";
import type { ProductsAttributes, ProductsCreationAttributes } from "./Products";
import { Rates as _Rates } from "./Rates";
import type { RatesAttributes, RatesCreationAttributes } from "./Rates";
import { Sizes as _Sizes } from "./Sizes";
import type { SizesAttributes, SizesCreationAttributes } from "./Sizes";
import { Types as _Types } from "./Types";
import type { TypesAttributes, TypesCreationAttributes } from "./Types";
import { Users as _Users } from "./Users";
import type { UsersAttributes, UsersCreationAttributes } from "./Users";

export {
  _CartDetail as CartDetail,
  _Carts as Carts,
  _Categories as Categories,
  _Colors as Colors,
  _Images as Images,
  _OrderDetail as OrderDetail,
  _Orders as Orders,
  _Prices as Prices,
  _Product_Color as Product_Color,
  _Product_Size as Product_Size,
  _Products as Products,
  _Rates as Rates,
  _Sizes as Sizes,
  _Types as Types,
  _Users as Users,
};

export type {
  CartDetailAttributes,
  CartDetailCreationAttributes,
  CartsAttributes,
  CartsCreationAttributes,
  CategoriesAttributes,
  CategoriesCreationAttributes,
  ColorsAttributes,
  ColorsCreationAttributes,
  ImagesAttributes,
  ImagesCreationAttributes,
  OrderDetailAttributes,
  OrderDetailCreationAttributes,
  OrdersAttributes,
  OrdersCreationAttributes,
  PricesAttributes,
  PricesCreationAttributes,
  Product_ColorAttributes,
  Product_ColorCreationAttributes,
  Product_SizeAttributes,
  Product_SizeCreationAttributes,
  ProductsAttributes,
  ProductsCreationAttributes,
  RatesAttributes,
  RatesCreationAttributes,
  SizesAttributes,
  SizesCreationAttributes,
  TypesAttributes,
  TypesCreationAttributes,
  UsersAttributes,
  UsersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const CartDetail = _CartDetail.initModel(sequelize);
  const Carts = _Carts.initModel(sequelize);
  const Categories = _Categories.initModel(sequelize);
  const Colors = _Colors.initModel(sequelize);
  const Images = _Images.initModel(sequelize);
  const OrderDetail = _OrderDetail.initModel(sequelize);
  const Orders = _Orders.initModel(sequelize);
  const Prices = _Prices.initModel(sequelize);
  const Product_Color = _Product_Color.initModel(sequelize);
  const Product_Size = _Product_Size.initModel(sequelize);
  const Products = _Products.initModel(sequelize);
  const Rates = _Rates.initModel(sequelize);
  const Sizes = _Sizes.initModel(sequelize);
  const Types = _Types.initModel(sequelize);
  const Users = _Users.initModel(sequelize);

  Carts.belongsToMany(Products, { as: 'product_id_Products', through: CartDetail, foreignKey: "cart_id", otherKey: "product_id" });
  Colors.belongsToMany(Products, { as: 'product_id_Products_Product_Colors', through: Product_Color, foreignKey: "color_id", otherKey: "product_id" });
  Orders.belongsToMany(Products, { as: 'product_id_Products_OrderDetails', through: OrderDetail, foreignKey: "order_id", otherKey: "product_id" });
  Products.belongsToMany(Carts, { as: 'cart_id_Carts', through: CartDetail, foreignKey: "product_id", otherKey: "cart_id" });
  Products.belongsToMany(Colors, { as: 'color_id_Colors', through: Product_Color, foreignKey: "product_id", otherKey: "color_id" });
  Products.belongsToMany(Orders, { as: 'order_id_Orders', through: OrderDetail, foreignKey: "product_id", otherKey: "order_id" });
  Products.belongsToMany(Sizes, { as: 'size_id_Sizes', through: Product_Size, foreignKey: "product_id", otherKey: "size_id" });
  Products.belongsToMany(Users, { as: 'user_id_Users', through: Rates, foreignKey: "product_id", otherKey: "user_id" });
  Sizes.belongsToMany(Products, { as: 'product_id_Products_Product_Sizes', through: Product_Size, foreignKey: "size_id", otherKey: "product_id" });
  Users.belongsToMany(Products, { as: 'product_id_Products_Rates', through: Rates, foreignKey: "user_id", otherKey: "product_id" });
  CartDetail.belongsTo(Carts, { as: "cart", foreignKey: "cart_id"});
  Carts.hasMany(CartDetail, { as: "CartDetails", foreignKey: "cart_id"});
  Products.belongsTo(Categories, { as: "cate", foreignKey: "cate_id"});
  Categories.hasMany(Products, { as: "Products", foreignKey: "cate_id"});
  Product_Color.belongsTo(Colors, { as: "color", foreignKey: "color_id"});
  Colors.hasMany(Product_Color, { as: "Product_Colors", foreignKey: "color_id"});
  OrderDetail.belongsTo(Orders, { as: "order", foreignKey: "order_id"});
  Orders.hasMany(OrderDetail, { as: "OrderDetails", foreignKey: "order_id"});
  Products.belongsTo(Prices, { as: "price", foreignKey: "price_id"});
  Prices.hasMany(Products, { as: "Products", foreignKey: "price_id"});
  CartDetail.belongsTo(Products, { as: "product", foreignKey: "product_id"});
  Products.hasMany(CartDetail, { as: "CartDetails", foreignKey: "product_id"});
  Images.belongsTo(Products, { as: "product", foreignKey: "product_id"});
  Products.hasMany(Images, { as: "Images", foreignKey: "product_id"});
  OrderDetail.belongsTo(Products, { as: "product", foreignKey: "product_id"});
  Products.hasMany(OrderDetail, { as: "OrderDetails", foreignKey: "product_id"});
  Product_Color.belongsTo(Products, { as: "product", foreignKey: "product_id"});
  Products.hasMany(Product_Color, { as: "Product_Colors", foreignKey: "product_id"});
  Product_Size.belongsTo(Products, { as: "product", foreignKey: "product_id"});
  Products.hasMany(Product_Size, { as: "Product_Sizes", foreignKey: "product_id"});
  Rates.belongsTo(Products, { as: "product", foreignKey: "product_id"});
  Products.hasMany(Rates, { as: "Rates", foreignKey: "product_id"});
  Product_Size.belongsTo(Sizes, { as: "size", foreignKey: "size_id"});
  Sizes.hasMany(Product_Size, { as: "Product_Sizes", foreignKey: "size_id"});
  Products.belongsTo(Types, { as: "type", foreignKey: "type_id"});
  Types.hasMany(Products, { as: "Products", foreignKey: "type_id"});
  Carts.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(Carts, { as: "Carts", foreignKey: "user_id"});
  Orders.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(Orders, { as: "Orders", foreignKey: "user_id"});
  Rates.belongsTo(Users, { as: "user", foreignKey: "user_id"});
  Users.hasMany(Rates, { as: "Rates", foreignKey: "user_id"});

  return {
    CartDetail: CartDetail,
    Carts: Carts,
    Categories: Categories,
    Colors: Colors,
    Images: Images,
    OrderDetail: OrderDetail,
    Orders: Orders,
    Prices: Prices,
    Product_Color: Product_Color,
    Product_Size: Product_Size,
    Products: Products,
    Rates: Rates,
    Sizes: Sizes,
    Types: Types,
    Users: Users,
  };
}
