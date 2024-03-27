import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/sequelize.util.js';
import Restaurant from './restaurant.model.js';


export default class Category extends Model { }

Category.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
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
        modelName: 'Category',
        tableName: 'categories'
    }
);

