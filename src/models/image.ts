import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Image extends Model {
    public id!: number;
    public url!: string;
    public description!: string;
}

Image.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
    },
    {
        sequelize,
        modelName: 'Image',
    }
);

export default Image;