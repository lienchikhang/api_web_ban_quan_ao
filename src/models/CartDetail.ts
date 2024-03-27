import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Carts, CartsId } from './Carts.js';
import type { Products, ProductsId } from './Products.js';

export interface CartDetailAttributes {
  cart_id: number;
  product_id: number;
  amount: number;
  price: number;
}

export type CartDetailPk = "cart_id" | "product_id";
export type CartDetailId = CartDetail[CartDetailPk];
export type CartDetailCreationAttributes = CartDetailAttributes;

export class CartDetail extends Model<CartDetailAttributes, CartDetailCreationAttributes> implements CartDetailAttributes {
  cart_id!: number;
  product_id!: number;
  amount!: number;
  price!: number;

  // CartDetail belongsTo Carts via cart_id
  cart!: Carts;
  getCart!: Sequelize.BelongsToGetAssociationMixin<Carts>;
  setCart!: Sequelize.BelongsToSetAssociationMixin<Carts, CartsId>;
  createCart!: Sequelize.BelongsToCreateAssociationMixin<Carts>;
  // CartDetail belongsTo Products via product_id
  product!: Products;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<Products>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<Products, ProductsId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<Products>;

  static initModel(sequelize: Sequelize.Sequelize): typeof CartDetail {
    return CartDetail.init({
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Carts',
          key: 'cart_id'
        }
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Products',
          key: 'product_id'
        }
      },
      amount: {
        type: DataTypes.TINYINT,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'CartDetail',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "cart_id" },
            { name: "product_id" },
          ]
        },
        {
          name: "product_id",
          using: "BTREE",
          fields: [
            { name: "product_id" },
          ]
        },
      ]
    });
  }
}
