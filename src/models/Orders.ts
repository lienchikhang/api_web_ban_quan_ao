import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { OrderDetail, OrderDetailId } from './OrderDetail.js';
import type { Products, ProductsId } from './Products.js';
import type { Users, UsersId } from './Users.js';

export interface OrdersAttributes {
  order_id: number;
  user_id: number;
  order_date: Date;
  total_price: number;
}

export type OrdersPk = "order_id";
export type OrdersId = Orders[OrdersPk];
export type OrdersOptionalAttributes = "order_id" | "total_price";
export type OrdersCreationAttributes = Optional<OrdersAttributes, OrdersOptionalAttributes>;

export class Orders extends Model<OrdersAttributes, OrdersCreationAttributes> implements OrdersAttributes {
  order_id!: number;
  user_id!: number;
  order_date!: Date;
  total_price!: number;

  // Orders hasMany OrderDetail via order_id
  OrderDetails!: OrderDetail[];
  getOrderDetails!: Sequelize.HasManyGetAssociationsMixin<OrderDetail>;
  setOrderDetails!: Sequelize.HasManySetAssociationsMixin<OrderDetail, OrderDetailId>;
  addOrderDetail!: Sequelize.HasManyAddAssociationMixin<OrderDetail, OrderDetailId>;
  addOrderDetails!: Sequelize.HasManyAddAssociationsMixin<OrderDetail, OrderDetailId>;
  createOrderDetail!: Sequelize.HasManyCreateAssociationMixin<OrderDetail>;
  removeOrderDetail!: Sequelize.HasManyRemoveAssociationMixin<OrderDetail, OrderDetailId>;
  removeOrderDetails!: Sequelize.HasManyRemoveAssociationsMixin<OrderDetail, OrderDetailId>;
  hasOrderDetail!: Sequelize.HasManyHasAssociationMixin<OrderDetail, OrderDetailId>;
  hasOrderDetails!: Sequelize.HasManyHasAssociationsMixin<OrderDetail, OrderDetailId>;
  countOrderDetails!: Sequelize.HasManyCountAssociationsMixin;
  // Orders belongsToMany Products via order_id and product_id
  product_id_Products_OrderDetails!: Products[];
  getProduct_id_Products_OrderDetails!: Sequelize.BelongsToManyGetAssociationsMixin<Products>;
  setProduct_id_Products_OrderDetails!: Sequelize.BelongsToManySetAssociationsMixin<Products, ProductsId>;
  addProduct_id_Products_OrderDetail!: Sequelize.BelongsToManyAddAssociationMixin<Products, ProductsId>;
  addProduct_id_Products_OrderDetails!: Sequelize.BelongsToManyAddAssociationsMixin<Products, ProductsId>;
  createProduct_id_Products_OrderDetail!: Sequelize.BelongsToManyCreateAssociationMixin<Products>;
  removeProduct_id_Products_OrderDetail!: Sequelize.BelongsToManyRemoveAssociationMixin<Products, ProductsId>;
  removeProduct_id_Products_OrderDetails!: Sequelize.BelongsToManyRemoveAssociationsMixin<Products, ProductsId>;
  hasProduct_id_Products_OrderDetail!: Sequelize.BelongsToManyHasAssociationMixin<Products, ProductsId>;
  hasProduct_id_Products_OrderDetails!: Sequelize.BelongsToManyHasAssociationsMixin<Products, ProductsId>;
  countProduct_id_Products_OrderDetails!: Sequelize.BelongsToManyCountAssociationsMixin;
  // Orders belongsTo Users via user_id
  user!: Users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Orders {
    return Orders.init({
      order_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id'
        }
      },
      order_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    }, {
      sequelize,
      tableName: 'Orders',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "order_id" },
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
