import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Products, ProductsId } from './Products.ts';

export interface PricesAttributes {
  price_id: number;
  price_num: number;
  is_deleted?: boolean;
}

export type PricesPk = "price_id";
export type PricesId = Prices[PricesPk];
export type PricesOptionalAttributes = "price_id" | "is_deleted";
export type PricesCreationAttributes = Optional<PricesAttributes, PricesOptionalAttributes>;

export class Prices extends Model<PricesAttributes, PricesCreationAttributes> implements PricesAttributes {
  price_id!: number;
  price_num!: number;
  is_deleted?: boolean;

  // Prices hasMany Products via price_id
  Products!: Products[];
  getProducts!: Sequelize.HasManyGetAssociationsMixin<Products>;
  setProducts!: Sequelize.HasManySetAssociationsMixin<Products, ProductsId>;
  addProduct!: Sequelize.HasManyAddAssociationMixin<Products, ProductsId>;
  addProducts!: Sequelize.HasManyAddAssociationsMixin<Products, ProductsId>;
  createProduct!: Sequelize.HasManyCreateAssociationMixin<Products>;
  removeProduct!: Sequelize.HasManyRemoveAssociationMixin<Products, ProductsId>;
  removeProducts!: Sequelize.HasManyRemoveAssociationsMixin<Products, ProductsId>;
  hasProduct!: Sequelize.HasManyHasAssociationMixin<Products, ProductsId>;
  hasProducts!: Sequelize.HasManyHasAssociationsMixin<Products, ProductsId>;
  countProducts!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Prices {
    return Prices.init({
      price_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      price_num: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      }
    }, {
      sequelize,
      tableName: 'Prices',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "price_id" },
          ]
        },
      ]
    });
  }
}
