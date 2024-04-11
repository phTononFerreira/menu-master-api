import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/sequelize.util.js';
import Product from './product.model.js';

export default class Rating extends Model {}

Rating.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productID: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Product,
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: 'Rating',
    tableName: 'ratings'
  }
);

Rating.belongsTo(sequelize.models.Product, { as: 'product', foreignKey: 'productID' });