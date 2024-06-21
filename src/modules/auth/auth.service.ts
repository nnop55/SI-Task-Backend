import { hashPassword } from "../../utils/auth";
import NotFoundError from "../../utils/errors/notFoundError";
import User from "./auth.model";

export const insertUser = async (
    payload: any
) => {
    const hashedPassword = hashPassword(payload.password);

    const user = {
        ...payload,
        password: hashedPassword
    }

    const newUser = new User(user);
    await newUser.save();
    return newUser;
}

export const updateUserAccessToken = async (
    searchColumn: string,
    value: string,
    column: string,
    token: string | null,
) => {
    const user = await getUserByColumn(
        searchColumn,
        value
    );

    Object.assign(user, { [column]: token });
    await user.save();
    return user;
}

export const getUserByColumn = async (
    column: string,
    value: string
) => {
    const query: any = {};
    query[column] = value;
    const user = await User.findOne(query);

    if (!user) {
        throw new NotFoundError('User not found')
    }
    return user;
}