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