import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Products, ProductsId } from './Products.ts';
import type { Users, UsersId } from './Users.ts';

export interface RatesAttributes {
  product_id: number;
  user_id: number;
  rate_date?: Date;
  rate_num: number;
}

export type RatesPk = "product_id" | "user_id";
export type RatesId = Rates[RatesPk];
export type RatesOptionalAttributes = "rate_date";
export type RatesCreationAttributes = Optional<RatesAttributes, RatesOptionalAttributes>;

export class Rates extends Model<RatesAttributes, RatesCreationAttributes> implements RatesAttributes {
  product_id!: number;
  user_id!: number;
  rate_date?: Date;
  rate_num!: number;

  // Rates belongsTo Products via product_id
  product!: Products;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<Products>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<Products, ProductsId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<Products>;
  // Rates belongsTo Users via user_id
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Rates {
    return Rates.init({
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Products',
          key: 'product_id'
        }
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'user_id'
        }
      },
      rate_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      rate_num: {
        type: DataTypes.TINYINT,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'Rates',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "product_id" },
            { name: "user_id" },
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
