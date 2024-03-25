import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { CartDetail, CartDetailId } from './CartDetail.ts';
import type { Carts, CartsId } from './Carts.ts';
import type { Categories, CategoriesId } from './Categories.ts';
import type { Colors, ColorsId } from './Colors.ts';
import type { Images, ImagesId } from './Images.ts';
import type { OrderDetail, OrderDetailId } from './OrderDetail.ts';
import type { Orders, OrdersId } from './Orders.ts';
import type { Prices, PricesId } from './Prices.ts';
import type { Product_Color, Product_ColorId } from './Product_Color.ts';
import type { Rates, RatesId } from './Rates.ts';
import type { Types, TypesId } from './Types.ts';
import type { Users, UsersId } from './Users.ts';

export interface ProductsAttributes {
  product_id: number;
  product_name: string;
  product_desc: string;
  type_id: number;
  cate_id: number;
  price_id: number;
  is_deleted?: boolean;
}

export type ProductsPk = "product_id";
export type ProductsId = Products[ProductsPk];
export type ProductsOptionalAttributes = "product_id" | "is_deleted";
export type ProductsCreationAttributes = Optional<ProductsAttributes, ProductsOptionalAttributes>;

export class Products extends Model<ProductsAttributes, ProductsCreationAttributes> implements ProductsAttributes {
  product_id!: number;
  product_name!: string;
  product_desc!: string;
  type_id!: number;
  cate_id!: number;
  price_id!: number;
  is_deleted?: boolean;

  // Products belongsTo Categories via cate_id
  cate!: Categories;
  getCate!: Sequelize.BelongsToGetAssociationMixin<Categories>;
  setCate!: Sequelize.BelongsToSetAssociationMixin<Categories, CategoriesId>;
  createCate!: Sequelize.BelongsToCreateAssociationMixin<Categories>;
  // Products belongsTo Prices via price_id
  price!: Prices;
  getPrice!: Sequelize.BelongsToGetAssociationMixin<Prices>;
  setPrice!: Sequelize.BelongsToSetAssociationMixin<Prices, PricesId>;
  createPrice!: Sequelize.BelongsToCreateAssociationMixin<Prices>;
  // Products hasMany CartDetail via product_id
  CartDetails!: CartDetail[];
  getCartDetails!: Sequelize.HasManyGetAssociationsMixin<CartDetail>;
  setCartDetails!: Sequelize.HasManySetAssociationsMixin<CartDetail, CartDetailId>;
  addCartDetail!: Sequelize.HasManyAddAssociationMixin<CartDetail, CartDetailId>;
  addCartDetails!: Sequelize.HasManyAddAssociationsMixin<CartDetail, CartDetailId>;
  createCartDetail!: Sequelize.HasManyCreateAssociationMixin<CartDetail>;
  removeCartDetail!: Sequelize.HasManyRemoveAssociationMixin<CartDetail, CartDetailId>;
  removeCartDetails!: Sequelize.HasManyRemoveAssociationsMixin<CartDetail, CartDetailId>;
  hasCartDetail!: Sequelize.HasManyHasAssociationMixin<CartDetail, CartDetailId>;
  hasCartDetails!: Sequelize.HasManyHasAssociationsMixin<CartDetail, CartDetailId>;
  countCartDetails!: Sequelize.HasManyCountAssociationsMixin;
  // Products belongsToMany Carts via product_id and cart_id
  cart_id_Carts!: Carts[];
  getCart_id_Carts!: Sequelize.BelongsToManyGetAssociationsMixin<Carts>;
  setCart_id_Carts!: Sequelize.BelongsToManySetAssociationsMixin<Carts, CartsId>;
  addCart_id_Cart!: Sequelize.BelongsToManyAddAssociationMixin<Carts, CartsId>;
  addCart_id_Carts!: Sequelize.BelongsToManyAddAssociationsMixin<Carts, CartsId>;
  createCart_id_Cart!: Sequelize.BelongsToManyCreateAssociationMixin<Carts>;
  removeCart_id_Cart!: Sequelize.BelongsToManyRemoveAssociationMixin<Carts, CartsId>;
  removeCart_id_Carts!: Sequelize.BelongsToManyRemoveAssociationsMixin<Carts, CartsId>;
  hasCart_id_Cart!: Sequelize.BelongsToManyHasAssociationMixin<Carts, CartsId>;
  hasCart_id_Carts!: Sequelize.BelongsToManyHasAssociationsMixin<Carts, CartsId>;
  countCart_id_Carts!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Products belongsToMany Colors via product_id and color_id
  color_id_Colors!: Colors[];
  getColor_id_Colors!: Sequelize.BelongsToManyGetAssociationsMixin<Colors>;
  setColor_id_Colors!: Sequelize.BelongsToManySetAssociationsMixin<Colors, ColorsId>;
  addColor_id_Color!: Sequelize.BelongsToManyAddAssociationMixin<Colors, ColorsId>;
  addColor_id_Colors!: Sequelize.BelongsToManyAddAssociationsMixin<Colors, ColorsId>;
  createColor_id_Color!: Sequelize.BelongsToManyCreateAssociationMixin<Colors>;
  removeColor_id_Color!: Sequelize.BelongsToManyRemoveAssociationMixin<Colors, ColorsId>;
  removeColor_id_Colors!: Sequelize.BelongsToManyRemoveAssociationsMixin<Colors, ColorsId>;
  hasColor_id_Color!: Sequelize.BelongsToManyHasAssociationMixin<Colors, ColorsId>;
  hasColor_id_Colors!: Sequelize.BelongsToManyHasAssociationsMixin<Colors, ColorsId>;
  countColor_id_Colors!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Products hasMany Images via product_id
  Images!: Images[];
  getImages!: Sequelize.HasManyGetAssociationsMixin<Images>;
  setImages!: Sequelize.HasManySetAssociationsMixin<Images, ImagesId>;
  addImage!: Sequelize.HasManyAddAssociationMixin<Images, ImagesId>;
  addImages!: Sequelize.HasManyAddAssociationsMixin<Images, ImagesId>;
  createImage!: Sequelize.HasManyCreateAssociationMixin<Images>;
  removeImage!: Sequelize.HasManyRemoveAssociationMixin<Images, ImagesId>;
  removeImages!: Sequelize.HasManyRemoveAssociationsMixin<Images, ImagesId>;
  hasImage!: Sequelize.HasManyHasAssociationMixin<Images, ImagesId>;
  hasImages!: Sequelize.HasManyHasAssociationsMixin<Images, ImagesId>;
  countImages!: Sequelize.HasManyCountAssociationsMixin;
  // Products hasMany OrderDetail via product_id
  OrderDetails!: OrderDetail[];
  getOrderDetails!: Sequelize.HasManyGetAssociationsMixin<OrderDetail>;
  setOrderDetails!: Sequelize.HasManySetAssociationsMixin<OrderDetail, OrderDetailId>;
  addOrderDetail!: Sequelize.HasManyAddAssociationMixin<OrderDetail, OrderDetailId>;
  addOrderDetails!: Sequelize.HasManyAddAssociationsMixin<OrderDetail, OrderDetailId>;
  createOrderDetail!: Sequelize.HasManyCreateAssociationMixin<OrderDetail>;
  removeOrderDetail!: Sequelize.HasManyRemoveAssociationMixin<OrderDetail, OrderDetailId>;
  removeOrderDetails!: Sequelize.HasManyRemoveAssociationsMixin<OrderDetail, OrderDetailId>;
  hasOrderDetail!: Sequelize.HasManyHasAssociationMixin<OrderDetail, OrderDetailId>;
  hasOrderDetails!: Sequelize.HasManyHasAssociationsMixin<OrderDetail, OrderDetailId>;
  countOrderDetails!: Sequelize.HasManyCountAssociationsMixin;
  // Products belongsToMany Orders via product_id and order_id
  order_id_Orders!: Orders[];
  getOrder_id_Orders!: Sequelize.BelongsToManyGetAssociationsMixin<Orders>;
  setOrder_id_Orders!: Sequelize.BelongsToManySetAssociationsMixin<Orders, OrdersId>;
  addOrder_id_Order!: Sequelize.BelongsToManyAddAssociationMixin<Orders, OrdersId>;
  addOrder_id_Orders!: Sequelize.BelongsToManyAddAssociationsMixin<Orders, OrdersId>;
  createOrder_id_Order!: Sequelize.BelongsToManyCreateAssociationMixin<Orders>;
  removeOrder_id_Order!: Sequelize.BelongsToManyRemoveAssociationMixin<Orders, OrdersId>;
  removeOrder_id_Orders!: Sequelize.BelongsToManyRemoveAssociationsMixin<Orders, OrdersId>;
  hasOrder_id_Order!: Sequelize.BelongsToManyHasAssociationMixin<Orders, OrdersId>;
  hasOrder_id_Orders!: Sequelize.BelongsToManyHasAssociationsMixin<Orders, OrdersId>;
  countOrder_id_Orders!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Products hasMany Product_Color via product_id
  Product_Colors!: Product_Color[];
  getProduct_Colors!: Sequelize.HasManyGetAssociationsMixin<Product_Color>;
  setProduct_Colors!: Sequelize.HasManySetAssociationsMixin<Product_Color, Product_ColorId>;
  addProduct_Color!: Sequelize.HasManyAddAssociationMixin<Product_Color, Product_ColorId>;
  addProduct_Colors!: Sequelize.HasManyAddAssociationsMixin<Product_Color, Product_ColorId>;
  createProduct_Color!: Sequelize.HasManyCreateAssociationMixin<Product_Color>;
  removeProduct_Color!: Sequelize.HasManyRemoveAssociationMixin<Product_Color, Product_ColorId>;
  removeProduct_Colors!: Sequelize.HasManyRemoveAssociationsMixin<Product_Color, Product_ColorId>;
  hasProduct_Color!: Sequelize.HasManyHasAssociationMixin<Product_Color, Product_ColorId>;
  hasProduct_Colors!: Sequelize.HasManyHasAssociationsMixin<Product_Color, Product_ColorId>;
  countProduct_Colors!: Sequelize.HasManyCountAssociationsMixin;
  // Products hasMany Rates via product_id
  Rates!: Rates[];
  getRates!: Sequelize.HasManyGetAssociationsMixin<Rates>;
  setRates!: Sequelize.HasManySetAssociationsMixin<Rates, RatesId>;
  addRate!: Sequelize.HasManyAddAssociationMixin<Rates, RatesId>;
  addRates!: Sequelize.HasManyAddAssociationsMixin<Rates, RatesId>;
  createRate!: Sequelize.HasManyCreateAssociationMixin<Rates>;
  removeRate!: Sequelize.HasManyRemoveAssociationMixin<Rates, RatesId>;
  removeRates!: Sequelize.HasManyRemoveAssociationsMixin<Rates, RatesId>;
  hasRate!: Sequelize.HasManyHasAssociationMixin<Rates, RatesId>;
  hasRates!: Sequelize.HasManyHasAssociationsMixin<Rates, RatesId>;
  countRates!: Sequelize.HasManyCountAssociationsMixin;
  // Products belongsToMany Users via product_id and user_id
  user_id_Users!: Users[];
  getUser_id_Users!: Sequelize.BelongsToManyGetAssociationsMixin<Users>;
  setUser_id_Users!: Sequelize.BelongsToManySetAssociationsMixin<Users, UsersId>;
  addUser_id_User!: Sequelize.BelongsToManyAddAssociationMixin<Users, UsersId>;
  addUser_id_Users!: Sequelize.BelongsToManyAddAssociationsMixin<Users, UsersId>;
  createUser_id_User!: Sequelize.BelongsToManyCreateAssociationMixin<Users>;
  removeUser_id_User!: Sequelize.BelongsToManyRemoveAssociationMixin<Users, UsersId>;
  removeUser_id_Users!: Sequelize.BelongsToManyRemoveAssociationsMixin<Users, UsersId>;
  hasUser_id_User!: Sequelize.BelongsToManyHasAssociationMixin<Users, UsersId>;
  hasUser_id_Users!: Sequelize.BelongsToManyHasAssociationsMixin<Users, UsersId>;
  countUser_id_Users!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Products belongsTo Types via type_id
  type!: Types;
  getType!: Sequelize.BelongsToGetAssociationMixin<Types>;
  setType!: Sequelize.BelongsToSetAssociationMixin<Types, TypesId>;
  createType!: Sequelize.BelongsToCreateAssociationMixin<Types>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Products {
    return Products.init({
      product_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      product_name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      product_desc: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Types',
          key: 'type_id'
        }
      },
      cate_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'cate_id'
        }
      },
      price_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Prices',
          key: 'price_id'
        }
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      }
    }, {
      sequelize,
      tableName: 'Products',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "product_id" },
          ]
        },
        {
          name: "type_id",
          using: "BTREE",
          fields: [
            { name: "type_id" },
          ]
        },
        {
          name: "cate_id",
          using: "BTREE",
          fields: [
            { name: "cate_id" },
          ]
        },
        {
          name: "price_id",
          using: "BTREE",
          fields: [
            { name: "price_id" },
          ]
        },
      ]
    });
  }
}
