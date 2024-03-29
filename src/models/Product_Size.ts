import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Products, ProductsId } from './Products.js';
import type { Sizes, SizesId } from './Sizes.js';

export interface Product_SizeAttributes {
  product_id: number;
  size_id: number;
}

export type Product_SizePk = "product_id" | "size_id";
export type Product_SizeId = Product_Size[Product_SizePk];
export type Product_SizeCreationAttributes = Product_SizeAttributes;

export class Product_Size extends Model<Product_SizeAttributes, Product_SizeCreationAttributes> implements Product_SizeAttributes {
  product_id!: number;
  size_id!: number;

  // Product_Size belongsTo Products via product_id
  product!: Products;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<Products>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<Products, ProductsId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<Products>;
  // Product_Size belongsTo Sizes via size_id
  size!: Sizes;
  getSize!: Sequelize.BelongsToGetAssociationMixin<Sizes>;
  setSize!: Sequelize.BelongsToSetAssociationMixin<Sizes, SizesId>;
  createSize!: Sequelize.BelongsToCreateAssociationMixin<Sizes>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Product_Size {
    return Product_Size.init({
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Products',
          key: 'product_id'
        }
      },
      size_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Sizes',
          key: 'size_id'
        }
      }
    }, {
      sequelize,
      tableName: 'Product_Size',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "product_id" },
            { name: "size_id" },
          ]
        },
        {
          name: "size_id",
          using: "BTREE",
          fields: [
            { name: "size_id" },
          ]
        },
      ]
    });
  }
}
