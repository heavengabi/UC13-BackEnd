
import { db } from "../config/database";
import { User } from "../models/User";
export class UserService {

    async create(email: string, senha: string) {

        const usuario = new User(
            email,
            senha
        );

        const [result]:any = await db.query(
            "INSERT INTO usuarios (email, senha) VALUES (?, ?)",
            [
                usuario.getEmail(),
                usuario.getSenha()
            ]
        );

        return result;
    }

    async findAll() {

        const [rows]:any = await db.query(
            "SELECT * FROM usuarios"
        );

        return rows;
    }

    async findById(id: number) {

        const [rows]: any = await db.query(
            "SELECT * FROM usuarios WHERE id = ?",
            [id]
        );

        return rows[0];
    }

    async update(
        id: number,
        email: string,
        senha: string
    ) {

        const [result]:any = await db.query(
            `UPDATE usuarios
             SET email = ?, senha = ?
             WHERE id = ?`,
            [
                email,
                senha,
                id
            ]
        );

        return result;
    }

    async delete(id: number) {

        const [result]:any = await db.query(
            "DELETE FROM usuarios WHERE id = ?",
            [id]
        );

        return result;
    }
}