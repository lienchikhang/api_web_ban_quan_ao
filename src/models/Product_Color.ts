import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Colors, ColorsId } from './Colors.js';
import type { Products, ProductsId } from './Products.js';

export interface Product_ColorAttributes {
  color_id: number;
  product_id: number;
}

export type Product_ColorPk = "color_id" | "product_id";
export type Product_ColorId = Product_Color[Product_ColorPk];
export type Product_ColorCreationAttributes = Product_ColorAttributes;

export class Product_Color extends Model<Product_ColorAttributes, Product_ColorCreationAttributes> implements Product_ColorAttributes {
  color_id!: number;
  product_id!: number;

  // Product_Color belongsTo Colors via color_id
  color!: Colors;
  getColor!: Sequelize.BelongsToGetAssociationMixin<Colors>;
  setColor!: Sequelize.BelongsToSetAssociationMixin<Colors, ColorsId>;
  createColor!: Sequelize.BelongsToCreateAssociationMixin<Colors>;
  // Product_Color belongsTo Products via product_id
  product!: Products;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<Products>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<Products, ProductsId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<Products>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Product_Color {
    return Product_Color.init({
      color_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Colors',
          key: 'color_id'
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
      }
    }, {
      sequelize,
      tableName: 'Product_Color',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "color_id" },
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
