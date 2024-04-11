import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/sequelize.util.js';
import Category from './category.model.js';
import Restaurant from './restaurant.model.js';

export default class Product extends Model { }

Product.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        options: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        categoryID: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Category,
                key: 'id'
            }
        },
        restaurantID: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Restaurant,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'Product',
        tableName: 'products'
    }
);

Product.belongsTo(sequelize.models.Category, { as: 'category', foreignKey: 'categoryID' });
Product.belongsTo(sequelize.models.Restaurant, { as: 'restaurant', foreignKey: 'restaurantID' });