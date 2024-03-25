import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Products, ProductsId } from './Products.ts';

export interface ImagesAttributes {
  img_id: number;
  img_url: string;
  product_id: number;
  is_deleted?: boolean;
}

export type ImagesPk = "img_id";
export type ImagesId = Images[ImagesPk];
export type ImagesOptionalAttributes = "img_id" | "is_deleted";
export type ImagesCreationAttributes = Optional<ImagesAttributes, ImagesOptionalAttributes>;

export class Images extends Model<ImagesAttributes, ImagesCreationAttributes> implements ImagesAttributes {
  img_id!: number;
  img_url!: string;
  product_id!: number;
  is_deleted?: boolean;

  // Images belongsTo Products via product_id
  product!: Products;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<Products>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<Products, ProductsId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<Products>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Images {
    return Images.init({
      img_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      img_url: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'product_id'
        }
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      }
    }, {
      sequelize,
      tableName: 'Images',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "img_id" },
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
