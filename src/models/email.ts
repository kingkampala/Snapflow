import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';

class Email extends Model {
    public id!: number;
    public email!: string;
}

Email.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        modelName: 'Email',
    }
);

export default Email;