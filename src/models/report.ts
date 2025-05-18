import { TypeReport } from "./type-report";
import { Usuario } from "./user.interface";
import { VideoGame } from "./video-game.interface";

export interface Report {
    id: number;
    createdAt: Date;
    deletedAt: null;
    state: string;
    typeReport?: TypeReport;
    user?: Usuario
    videoGame?: VideoGame
}