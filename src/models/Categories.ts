import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Products, ProductsId } from './Products.js';

export interface CategoriesAttributes {
  cate_id: number;
  cate_name: string;
  is_deleted?: boolean;
}

export type CategoriesPk = "cate_id";
export type CategoriesId = Categories[CategoriesPk];
export type CategoriesOptionalAttributes = "cate_id" | "is_deleted";
export type CategoriesCreationAttributes = Optional<CategoriesAttributes, CategoriesOptionalAttributes>;

export class Categories extends Model<CategoriesAttributes, CategoriesCreationAttributes> implements CategoriesAttributes {
  cate_id!: number;
  cate_name!: string;
  is_deleted?: boolean;

  // Categories hasMany Products via cate_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof Categories {
    return Categories.init({
      cate_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      cate_name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      }
    }, {
      sequelize,
      tableName: 'Categories',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "cate_id" },
          ]
        },
      ]
    });
  }
}
