import { Requisito } from "./requisitos.interface";
import { VideoGame } from "./video-game.interface";

export interface Version {
    id: number;
    createdAt: Date;
    deletedAt: null;
    version: string;
    descripcion: string;
    videGame: VideoGame;
    requisitos: Requisito[];
}