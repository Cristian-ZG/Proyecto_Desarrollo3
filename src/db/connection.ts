import { Sequelize } from "sequelize";


const sequelize = new Sequelize('bv9y077tcfuyxtgurjal', 'umgc60thjbqfq9vd', 'kspfMjojfMfLNC85Vu08', {
    host: 'bv9y077tcfuyxtgurjal-mysql.services.clever-cloud.com',
    dialect: 'mysql',   
});

export default sequelize;