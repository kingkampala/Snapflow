import sequelize from './db';

const syncDb = async () => {
    try {
        await sequelize.sync({ alter: true });
        console.log('sequelize models synchronized successfully');
    } catch (err) {
        console.error('error synchronizing the database:', err);
    }
};

export default syncDb;