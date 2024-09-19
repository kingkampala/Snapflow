import { DataTypes, Model } from 'sequelize';
import sequelize from '../db';
import Image from './image';

class Comment extends Model {
    public id!: number;
    public content!: string;
    public imageId!: number;
}

Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        imageId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Image,
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
    },
    {
        sequelize,
        modelName: 'Comment',
    }
);

Image.hasMany(Comment, { foreignKey: 'imageId' });
Comment.belongsTo(Image, { foreignKey: 'imageId' });

export default Comment;