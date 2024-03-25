import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Orders, OrdersId } from './Orders.ts';
import type { Products, ProductsId } from './Products.ts';

export interface OrderDetailAttributes {
  order_id: number;
  product_id: number;
  amount: number;
  price: number;
}

export type OrderDetailPk = "order_id" | "product_id";
export type OrderDetailId = OrderDetail[OrderDetailPk];
export type OrderDetailCreationAttributes = OrderDetailAttributes;

export class OrderDetail extends Model<OrderDetailAttributes, OrderDetailCreationAttributes> implements OrderDetailAttributes {
  order_id!: number;
  product_id!: number;
  amount!: number;
  price!: number;

  // OrderDetail belongsTo Orders via order_id
  order!: Orders;
  getOrder!: Sequelize.BelongsToGetAssociationMixin<Orders>;
  setOrder!: Sequelize.BelongsToSetAssociationMixin<Orders, OrdersId>;
  createOrder!: Sequelize.BelongsToCreateAssociationMixin<Orders>;
  // OrderDetail belongsTo Products via product_id
  product!: Products;
  getProduct!: Sequelize.BelongsToGetAssociationMixin<Products>;
  setProduct!: Sequelize.BelongsToSetAssociationMixin<Products, ProductsId>;
  createProduct!: Sequelize.BelongsToCreateAssociationMixin<Products>;

  static initModel(sequelize: Sequelize.Sequelize): typeof OrderDetail {
    return OrderDetail.init({
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Orders',
          key: 'order_id'
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
      },
      amount: {
        type: DataTypes.TINYINT,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'OrderDetail',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "order_id" },
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
