import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Products, ProductsId } from './Products.js';

export interface TypesAttributes {
  type_id: number;
  type_name: string;
  is_deleted?: boolean;
}

export type TypesPk = "type_id";
export type TypesId = Types[TypesPk];
export type TypesOptionalAttributes = "type_id" | "is_deleted";
export type TypesCreationAttributes = Optional<TypesAttributes, TypesOptionalAttributes>;

export class Types extends Model<TypesAttributes, TypesCreationAttributes> implements TypesAttributes {
  type_id!: number;
  type_name!: string;
  is_deleted?: boolean;

  // Types hasMany Products via type_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof Types {
    return Types.init({
      type_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      type_name: {
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
      tableName: 'Types',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "type_id" },
          ]
        },
      ]
    });
  }
}
