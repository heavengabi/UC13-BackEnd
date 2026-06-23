import { Request, response, Response } from "express";
import { UserService } from "../services/UserService";

export class UserController {
  private service = new UserService();
  async createUsuario(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .json({ mensagem: "Email e senha são obrigatorios" });
      }
      await this.service.create(email, password);
      return res.status(201).json({ mensagem: "Usuario criado com sucesso" });
    } catch {
      return res.status(500).json({ mensagem: "Erro ao criar usuario" });
    }
  }
  async listUsers(req: Request, res: Response) {
    try {
      const users = await this.service.findAll();
      return res.status(200).json(users);
    } catch {
      return res.status(500).json({ mensagem: "Erro ao listar usuarios" });
    }
  }
  async getUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = await this.service.findById(Number(id));
      if (!user) {
        return res.status(404).json({ mensagem: "Usuario não encontrado" });
      }
      return res.status(200).json(user);
    } catch {
      return res.status(500).json({ mensagem: "Erro ao buscar usuario" });
    }
  }
  async updateUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const id = req.params.id;
      if (!email || !password) {
        return res
          .status(400)
          .json({ mensagem: "Email e senha são obrigatorios" });
      }
      await this.service.update(Number(id), email, password);
      return res
        .status(200)
        .json({ mensagem: "Usuario atualizado com sucesso" });
    } catch {
      return res.status(500).json({ mensagem: "Erro ao atualizar usuario" });
    }
  }
  async deleteUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      await this.service.delete(Number(id));
      return res.status(200).json({ mensagem: "Usuario deletado com sucesso" });
    } catch {
      return res.status(500).json({ mensagem: "Erro ao deletar usuario" });
    }
  }
}
