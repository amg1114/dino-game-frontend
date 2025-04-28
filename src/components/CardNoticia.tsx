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
            <div className="sectionCard w-sm aspect-[16/9] bg-body p-0.5">
                {news.thumb.url ?
                    <img className="newsImage w-full aspect-[16/9] bg-placeholder-2 object-cover mb-2 rounded-md"
                        src={news.thumb.url}
                        alt="news image"
                    /> : <></>}
                <div className="newsText h-46">
                    <h3 className="newsTitle w-full text-white uppercase ">{news.titulo}</h3>
                    <div className="newsDescription text-white ">
                        <p dangerouslySetInnerHTML={{ __html: truncatedtext }}></p>
                    </div>
                    <Link className="btn-ver-mas flex flex-row text-green mt-1" to={'/blog/' + news.slug}>
                        Ver más
                        <SquareArrowOutUpRight className="see-more-icon stroke-green stroke-2 size-3 mt-2" />
                    </Link>
                </div>
            </div>
        </div>
    );
}