import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

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
