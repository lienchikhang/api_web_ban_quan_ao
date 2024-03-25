import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { CartDetail, CartDetailId } from './CartDetail.ts';
import type { Products, ProductsId } from './Products.ts';
import type { Users, UsersId } from './Users.ts';

export interface CartsAttributes {
  cart_id: number;
  user_id: number;
  total_price: number;
}

export type CartsPk = "cart_id";
export type CartsId = Carts[CartsPk];
export type CartsOptionalAttributes = "cart_id" | "total_price";
export type CartsCreationAttributes = Optional<CartsAttributes, CartsOptionalAttributes>;

export class Carts extends Model<CartsAttributes, CartsCreationAttributes> implements CartsAttributes {
  cart_id!: number;
  user_id!: number;
  total_price!: number;

  // Carts hasMany CartDetail via cart_id
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
  // Carts belongsToMany Products via cart_id and product_id
  product_id_Products!: Products[];
  getProduct_id_Products!: Sequelize.BelongsToManyGetAssociationsMixin<Products>;
  setProduct_id_Products!: Sequelize.BelongsToManySetAssociationsMixin<Products, ProductsId>;
  addProduct_id_Product!: Sequelize.BelongsToManyAddAssociationMixin<Products, ProductsId>;
  addProduct_id_Products!: Sequelize.BelongsToManyAddAssociationsMixin<Products, ProductsId>;
  createProduct_id_Product!: Sequelize.BelongsToManyCreateAssociationMixin<Products>;
  removeProduct_id_Product!: Sequelize.BelongsToManyRemoveAssociationMixin<Products, ProductsId>;
  removeProduct_id_Products!: Sequelize.BelongsToManyRemoveAssociationsMixin<Products, ProductsId>;
  hasProduct_id_Product!: Sequelize.BelongsToManyHasAssociationMixin<Products, ProductsId>;
  hasProduct_id_Products!: Sequelize.BelongsToManyHasAssociationsMixin<Products, ProductsId>;
  countProduct_id_Products!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Carts belongsTo Users via user_id
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Carts {
    return Carts.init({
      cart_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id'
        }
      },
      total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    }, {
      sequelize,
      tableName: 'Carts',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "cart_id" },
          ]
        },
        {
          name: "user_id",
          using: "BTREE",
          fields: [
            { name: "user_id" },
          ]
        },
      ]
    });
  }
}
