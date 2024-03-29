import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Product_Size, Product_SizeId } from './Product_Size.js';
import type { Products, ProductsId } from './Products.js';

export interface SizesAttributes {
  size_id: number;
  is_deleted?: boolean;
  size_key: string;
}

export type SizesPk = "size_id";
export type SizesId = Sizes[SizesPk];
export type SizesOptionalAttributes = "size_id" | "is_deleted";
export type SizesCreationAttributes = Optional<SizesAttributes, SizesOptionalAttributes>;

export class Sizes extends Model<SizesAttributes, SizesCreationAttributes> implements SizesAttributes {
  size_id!: number;
  is_deleted?: boolean;
  size_key!: string;

  // Sizes hasMany Product_Size via size_id
  Product_Sizes!: Product_Size[];
  getProduct_Sizes!: Sequelize.HasManyGetAssociationsMixin<Product_Size>;
  setProduct_Sizes!: Sequelize.HasManySetAssociationsMixin<Product_Size, Product_SizeId>;
  addProduct_Size!: Sequelize.HasManyAddAssociationMixin<Product_Size, Product_SizeId>;
  addProduct_Sizes!: Sequelize.HasManyAddAssociationsMixin<Product_Size, Product_SizeId>;
  createProduct_Size!: Sequelize.HasManyCreateAssociationMixin<Product_Size>;
  removeProduct_Size!: Sequelize.HasManyRemoveAssociationMixin<Product_Size, Product_SizeId>;
  removeProduct_Sizes!: Sequelize.HasManyRemoveAssociationsMixin<Product_Size, Product_SizeId>;
  hasProduct_Size!: Sequelize.HasManyHasAssociationMixin<Product_Size, Product_SizeId>;
  hasProduct_Sizes!: Sequelize.HasManyHasAssociationsMixin<Product_Size, Product_SizeId>;
  countProduct_Sizes!: Sequelize.HasManyCountAssociationsMixin;
  // Sizes belongsToMany Products via size_id and product_id
  product_id_Products_Product_Sizes!: Products[];
  getProduct_id_Products_Product_Sizes!: Sequelize.BelongsToManyGetAssociationsMixin<Products>;
  setProduct_id_Products_Product_Sizes!: Sequelize.BelongsToManySetAssociationsMixin<Products, ProductsId>;
  addProduct_id_Products_Product_Size!: Sequelize.BelongsToManyAddAssociationMixin<Products, ProductsId>;
  addProduct_id_Products_Product_Sizes!: Sequelize.BelongsToManyAddAssociationsMixin<Products, ProductsId>;
  createProduct_id_Products_Product_Size!: Sequelize.BelongsToManyCreateAssociationMixin<Products>;
  removeProduct_id_Products_Product_Size!: Sequelize.BelongsToManyRemoveAssociationMixin<Products, ProductsId>;
  removeProduct_id_Products_Product_Sizes!: Sequelize.BelongsToManyRemoveAssociationsMixin<Products, ProductsId>;
  hasProduct_id_Products_Product_Size!: Sequelize.BelongsToManyHasAssociationMixin<Products, ProductsId>;
  hasProduct_id_Products_Product_Sizes!: Sequelize.BelongsToManyHasAssociationsMixin<Products, ProductsId>;
  countProduct_id_Products_Product_Sizes!: Sequelize.BelongsToManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Sizes {
    return Sizes.init({
      size_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      size_key: {
        type: DataTypes.STRING(10),
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'Sizes',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "size_id" },
          ]
        },
      ]
    });
  }
}
