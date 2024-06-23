import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const comparePasswords = (
    password: string,
    hashedPassword: string
) => {
    return bcrypt.compareSync(password, hashedPassword)
}

export const hashPassword = (
    password: string
) => {
    return bcrypt.hashSync(password, 10)
}

export const getJwt = (
    payload: any,
    secretKey: any,
    time: string = '10s'
) => {
    return jwt.sign(payload, secretKey!, { expiresIn: time });
}

export const verifyJwt = (
    token: string,
    secretKey: string
) => {
    return jwt.verify(token, secretKey);
}