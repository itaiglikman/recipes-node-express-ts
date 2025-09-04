import { v4 as uuid } from 'uuid';
import authUtils from "../01-utils/authUtils";
import { UnauthorizedError, ValidationError } from "../01-utils/client-errors";
import { BodyUser, Credentials, DbUser, User } from "../01-utils/types";
import appConfig from "../appConfig";

const sequelize = appConfig.sequelize;

async function registerUser(user: BodyUser) {
    const newUser = await createUser(user);
    const token = authUtils.createToken(newUser);
    return token;
}

async function login(credentials: Credentials) {
    const user = await getUserByEmail(credentials.email.toLocaleLowerCase());
    await authUtils.comparePass(credentials.password, user.password);
    const clientUser = authUtils.sanitizeUser(user);
    const token = authUtils.createToken(clientUser);
    return token;
}

async function createUser(user: BodyUser): Promise<User> {
    try {
        const id = uuid();
        const hashPass = authUtils.encryptPassword(user.password);
        const q = `INSERT INTO users (id,userName,email,password,firstName,lastName) VALUES (?,?,?,?,?,?)`;
        const values = [id, user.username, user.email, hashPass, user.firstName, user.lastName];
        await sequelize.query(q, { replacements: values });
        const newUser = { id, ...user };
        delete newUser.password;
        return newUser as User;
    } catch (error) {
        // check duplicity of username and email
        if (error.errors[0].path === 'userName')
            throw new ValidationError('Username is already taken.');
        if (error.errors[0].path === 'email')
            throw new ValidationError('Email is already taken.');
        throw error;
    }
}

async function getUserByEmail(email: string): Promise<DbUser> {
    const query = `SELECT * FROM users WHERE email=?`;
    const [result] = await sequelize.query(query, { replacements: [email] });
    const user = result[0] as DbUser;
    if (!user) throw new UnauthorizedError('Incorrect credentials');
    return user;
}


export default {
    registerUser, login
}

