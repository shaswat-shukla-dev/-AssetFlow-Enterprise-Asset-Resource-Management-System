import { findUserByEmail, createUser } from "../repositories/auth.repository.js";
import { hashPassword } from "../utils/password.js";

export const registerUser = async (payload) => {

    const existingUser = await findUserByEmail(payload.email);

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(payload.password);

    return createUser({
        username: payload.username,
        email: payload.email,
        password: hashedPassword,
        employeeId: payload.employeeId,
        roleId: payload.roleId
    });

};
import { comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";

export const loginUser = async ({ email, password }) => {

    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await comparePassword(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    const token = generateToken({
        id: user.id,
        role: user.roleId
    });

    return {
        token,
        user
    };

};