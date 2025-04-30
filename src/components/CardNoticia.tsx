import { SquareArrowOutUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { News } from "../models/news.interface";
import truncate from "truncate-html";

export function CardNoticia({ news }: { news: News }) {

    const truncatedtext = truncate(news.descripcion, {
        length: 140,
        ellipsis: "...",
    })
    return (
        <div>
            <div className="w-full md:w-mb aspect-[16/9] bg-body">
                {news.thumb.url ?
                    <img className="w-full aspect-[16/9] bg-placeholder-2 object-cover mb-2 rounded-md"
                        src={news.thumb.url}
                        alt="news image"
                    /> : <></>}
                <div className="min-h-auto">
                    <h3 className="w-full text-white uppercase ">{news.titulo}</h3>
                    <div className="text-white ">
                        <p>{truncatedtext}</p>
                    </div>
                    <Link className="flex flex-row text-green mt-1" to={'/blog/' + news.slug}>
                        Ver más
                        <SquareArrowOutUpRight className="stroke-green stroke-2 size-3 mt-2" />
                    </Link>
                </div>
            </div>
        </div>
    );
}