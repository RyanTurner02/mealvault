import { Request } from "express";

export interface UserRequest<P = {}> extends Request<P> {
  user?: { id: number };
}