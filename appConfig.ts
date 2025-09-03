import dotenv from 'dotenv';
dotenv.config()

class AppConfig{
    public dbConnection = `mysql://${process.env.DB_HOST}:DB_PASS@localhost:3306/${process.env.DB_NAME}`;

}

const appConfig = new AppConfig();

export default appConfig;


