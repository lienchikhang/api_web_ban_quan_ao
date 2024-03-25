import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface SizesAttributes {
  size_id: number;
  size_num: number;
  is_deleted?: boolean;
}

export type SizesPk = "size_id";
export type SizesId = Sizes[SizesPk];
export type SizesOptionalAttributes = "size_id" | "is_deleted";
export type SizesCreationAttributes = Optional<SizesAttributes, SizesOptionalAttributes>;

export class Sizes extends Model<SizesAttributes, SizesCreationAttributes> implements SizesAttributes {
  size_id!: number;
  size_num!: number;
  is_deleted?: boolean;


  static initModel(sequelize: Sequelize.Sequelize): typeof Sizes {
    return Sizes.init({
    size_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    size_num: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
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
