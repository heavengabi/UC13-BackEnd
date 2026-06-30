import { Request, Response } from "express";
import { UserService } from "../services/UserService";

export class UsuarioController {

    private service = new UserService();

    async createUsuario(
        req: Request,
        res: Response
    ) {

        try {

            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({
                    mensagem: "Email e senha são obrigatórios"
                });
            }

            await this.service.create(
                email,
                senha
            );

            return res.status(201).json({
                mensagem: "Usuário criado com sucesso"
            });

        } catch {

            return res.status(500).json({
                mensagem: "Erro interno"
            });

        }
    }

    async listUsuarios(
        req: Request,
        res: Response
    ) {

        try {

            const usuarios =
                await this.service.findAll();

            return res.status(200).json(
                usuarios
            );

        } catch {

            return res.status(500).json({
                mensagem: "Erro interno"
            });

        }
    }

    async getUsuario(
        req: Request,
        res: Response
    ) {

        try {

            const id = Number(
                req.params.id
            );

            const usuario =
                await this.service.findById(id);

            if (!usuario) {
                return res.status(404).json({
                    mensagem: "Usuário não encontrado"
                });
            }

            return res.status(200).json(
                usuario
            );

        } catch {

            return res.status(500).json({
                mensagem: "Erro interno"
            });

        }
    }

    async updateUsuario(
        req: Request,
        res: Response
    ) {

        try {

            const id = Number(
                req.params.id
            );

            const { email, senha } = req.body;

            await this.service.update(
                id,
                email,
                senha
            );

            return res.status(200).json({
                mensagem: "Usuário atualizado com sucesso"
            });

        } catch {

            return res.status(500).json({
                mensagem: "Erro interno"
            });

        }
    }

    async deleteUsuario(
        req: Request,
        res: Response
    ) {

        try {

            const id = Number(
                req.params.id
            );

            await this.service.delete(id);

            return res.status(204).send();

        } catch {

            return res.status(500).json({
                mensagem: "Erro interno"
            });

        }
    }
}