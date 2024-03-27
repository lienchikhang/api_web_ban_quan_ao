import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Carts, CartsId } from './Carts.js';
import type { Orders, OrdersId } from './Orders.js';
import type { Products, ProductsId } from './Products.js';
import type { Rates, RatesId } from './Rates.js';

export interface UsersAttributes {
  user_id: number;
  pass_word?: string;
  birth_year?: string;
  first_name?: string;
  last_name?: string;
  user_role?: string;
  email: string;
  google_app_id?: string;
  face_app_id?: string;
  is_deleted?: boolean;
  refresh_token?: string;
}

export type UsersPk = "user_id";
export type UsersId = Users[UsersPk];
export type UsersOptionalAttributes = "user_id" | "pass_word" | "birth_year" | "first_name" | "last_name" | "user_role" | "google_app_id" | "face_app_id" | "is_deleted" | "refresh_token";
export type UsersCreationAttributes = Optional<UsersAttributes, UsersOptionalAttributes>;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  user_id!: number;
  pass_word?: string;
  birth_year?: string;
  first_name?: string;
  last_name?: string;
  user_role?: string;
  email!: string;
  google_app_id?: string;
  face_app_id?: string;
  is_deleted?: boolean;
  refresh_token?: string;

  // Users hasMany Carts via user_id
  Carts!: Carts[];
  getCarts!: Sequelize.HasManyGetAssociationsMixin<Carts>;
  setCarts!: Sequelize.HasManySetAssociationsMixin<Carts, CartsId>;
  addCart!: Sequelize.HasManyAddAssociationMixin<Carts, CartsId>;
  addCarts!: Sequelize.HasManyAddAssociationsMixin<Carts, CartsId>;
  createCart!: Sequelize.HasManyCreateAssociationMixin<Carts>;
  removeCart!: Sequelize.HasManyRemoveAssociationMixin<Carts, CartsId>;
  removeCarts!: Sequelize.HasManyRemoveAssociationsMixin<Carts, CartsId>;
  hasCart!: Sequelize.HasManyHasAssociationMixin<Carts, CartsId>;
  hasCarts!: Sequelize.HasManyHasAssociationsMixin<Carts, CartsId>;
  countCarts!: Sequelize.HasManyCountAssociationsMixin;
  // Users hasMany Orders via user_id
  Orders!: Orders[];
  getOrders!: Sequelize.HasManyGetAssociationsMixin<Orders>;
  setOrders!: Sequelize.HasManySetAssociationsMixin<Orders, OrdersId>;
  addOrder!: Sequelize.HasManyAddAssociationMixin<Orders, OrdersId>;
  addOrders!: Sequelize.HasManyAddAssociationsMixin<Orders, OrdersId>;
  createOrder!: Sequelize.HasManyCreateAssociationMixin<Orders>;
  removeOrder!: Sequelize.HasManyRemoveAssociationMixin<Orders, OrdersId>;
  removeOrders!: Sequelize.HasManyRemoveAssociationsMixin<Orders, OrdersId>;
  hasOrder!: Sequelize.HasManyHasAssociationMixin<Orders, OrdersId>;
  hasOrders!: Sequelize.HasManyHasAssociationsMixin<Orders, OrdersId>;
  countOrders!: Sequelize.HasManyCountAssociationsMixin;
  // Users belongsToMany Products via user_id and product_id
  product_id_Products_Rates!: Products[];
  getProduct_id_Products_Rates!: Sequelize.BelongsToManyGetAssociationsMixin<Products>;
  setProduct_id_Products_Rates!: Sequelize.BelongsToManySetAssociationsMixin<Products, ProductsId>;
  addProduct_id_Products_Rate!: Sequelize.BelongsToManyAddAssociationMixin<Products, ProductsId>;
  addProduct_id_Products_Rates!: Sequelize.BelongsToManyAddAssociationsMixin<Products, ProductsId>;
  createProduct_id_Products_Rate!: Sequelize.BelongsToManyCreateAssociationMixin<Products>;
  removeProduct_id_Products_Rate!: Sequelize.BelongsToManyRemoveAssociationMixin<Products, ProductsId>;
  removeProduct_id_Products_Rates!: Sequelize.BelongsToManyRemoveAssociationsMixin<Products, ProductsId>;
  hasProduct_id_Products_Rate!: Sequelize.BelongsToManyHasAssociationMixin<Products, ProductsId>;
  hasProduct_id_Products_Rates!: Sequelize.BelongsToManyHasAssociationsMixin<Products, ProductsId>;
  countProduct_id_Products_Rates!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Users hasMany Rates via user_id
  Rates!: Rates[];
  getRates!: Sequelize.HasManyGetAssociationsMixin<Rates>;
  setRates!: Sequelize.HasManySetAssociationsMixin<Rates, RatesId>;
  addRate!: Sequelize.HasManyAddAssociationMixin<Rates, RatesId>;
  addRates!: Sequelize.HasManyAddAssociationsMixin<Rates, RatesId>;
  createRate!: Sequelize.HasManyCreateAssociationMixin<Rates>;
  removeRate!: Sequelize.HasManyRemoveAssociationMixin<Rates, RatesId>;
  removeRates!: Sequelize.HasManyRemoveAssociationsMixin<Rates, RatesId>;
  hasRate!: Sequelize.HasManyHasAssociationMixin<Rates, RatesId>;
  hasRates!: Sequelize.HasManyHasAssociationsMixin<Rates, RatesId>;
  countRates!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Users {
    return Users.init({
      user_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      pass_word: {
        type: DataTypes.STRING(250),
        allowNull: true
      },
      birth_year: {
        type: DataTypes.DATEONLY,
        allowNull: true
      },
      first_name: {
        type: DataTypes.STRING(150),
        allowNull: true
      },
      last_name: {
        type: DataTypes.STRING(150),
        allowNull: true
      },
      user_role: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: "client"
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      google_app_id: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      face_app_id: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      refresh_token: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'Users',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "user_id" },
          ]
        },
      ]
    });
  }
}
