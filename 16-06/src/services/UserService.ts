import { db } from "../config/database";
import { User } from "../models/User";

export class UserService {
    async create(email: string, password: string) {
        if (email.length == 0 || password.length == 0) {
            throw new Error("Informações inválidas");
        }

        const user = new User( email, password);

        const [result] = await db.query(
            "insert into usuario(email, senha) values (?, ?)",
            [
                user.getEmail(),
                user.getPassword()
            ]
        );

        return result;
    }

    async findAll() {
        const [rows] = await db.query("select * from usuario");
        return rows;
    }

    async findById(id: number) {
        const [rows]: any = await db.query(
            "select * from usuario where id = ?",
            [id]
        );

        return rows[0];
    }

    async update(
        id: number,
        email: string,
        password: string
    ) {
        const [result] = await db.query(
            "update usuario set email = ?, senha = ? where id = ?",
            [
                email,
                password,
                id
            ]
        );

        return result;
    }

    async delete(id: number) {
        const [result] = await db.query(
            "delete from usuario where id = ?",
            [id]
        );

        return result;
    }
}