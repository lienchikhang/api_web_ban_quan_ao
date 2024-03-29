import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Product_Color, Product_ColorId } from './Product_Color.js';
import type { Products, ProductsId } from './Products.js';

export interface ColorsAttributes {
  color_id: number;
  color_hex: string;
  is_deleted?: boolean;
  color_name: string;
}

export type ColorsPk = "color_id";
export type ColorsId = Colors[ColorsPk];
export type ColorsOptionalAttributes = "color_id" | "is_deleted";
export type ColorsCreationAttributes = Optional<ColorsAttributes, ColorsOptionalAttributes>;

export class Colors extends Model<ColorsAttributes, ColorsCreationAttributes> implements ColorsAttributes {
  color_id!: number;
  color_hex!: string;
  is_deleted?: boolean;
  color_name!: string;

  // Colors hasMany Product_Color via color_id
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
  // Colors belongsToMany Products via color_id and product_id
  product_id_Products_Product_Colors!: Products[];
  getProduct_id_Products_Product_Colors!: Sequelize.BelongsToManyGetAssociationsMixin<Products>;
  setProduct_id_Products_Product_Colors!: Sequelize.BelongsToManySetAssociationsMixin<Products, ProductsId>;
  addProduct_id_Products_Product_Color!: Sequelize.BelongsToManyAddAssociationMixin<Products, ProductsId>;
  addProduct_id_Products_Product_Colors!: Sequelize.BelongsToManyAddAssociationsMixin<Products, ProductsId>;
  createProduct_id_Products_Product_Color!: Sequelize.BelongsToManyCreateAssociationMixin<Products>;
  removeProduct_id_Products_Product_Color!: Sequelize.BelongsToManyRemoveAssociationMixin<Products, ProductsId>;
  removeProduct_id_Products_Product_Colors!: Sequelize.BelongsToManyRemoveAssociationsMixin<Products, ProductsId>;
  hasProduct_id_Products_Product_Color!: Sequelize.BelongsToManyHasAssociationMixin<Products, ProductsId>;
  hasProduct_id_Products_Product_Colors!: Sequelize.BelongsToManyHasAssociationsMixin<Products, ProductsId>;
  countProduct_id_Products_Product_Colors!: Sequelize.BelongsToManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Colors {
    return Colors.init({
      color_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      color_hex: {
        type: DataTypes.STRING(6),
        allowNull: false
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      color_name: {
        type: DataTypes.STRING(50),
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'Colors',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "color_id" },
          ]
        },
      ]
    });
  }
}
