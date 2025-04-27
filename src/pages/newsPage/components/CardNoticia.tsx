import { SquareArrowOutUpRight } from "lucide-react";
import { Link } from "react-router-dom";

type CardNoticiaProps = {
    title: string;
    image: string;
    description: string;
    slug: string;
}
export function CardNoticia({ title, image, description, slug }: CardNoticiaProps) {
    return (
        <div>
            <div className="sectionCard w-sm aspect-[16/9] bg-body p-0.5">
                {image ?
                    <img className="newsImage w-full aspect-[16/9] bg-placeholder-2 object-cover mb-2 rounded-md"
                        src={image}
                        alt="news image"
                    /> : <></>}
                <div className="newsText h-46">
                    <h3 className="newsTitle w-full text-white uppercase ">{title}</h3>
                    <div className="newsDescription text-white ">
                        <p dangerouslySetInnerHTML={{ __html: description.split("").slice(0, 140).join("") }}></p>
                    </div>
                    <Link className="btn-ver-mas flex flex-row text-green mt-1" to={"/blog/" + slug}>
                        Ver más
                        <SquareArrowOutUpRight className="see-more-icon stroke-green stroke-2 size-3 mt-2" />
                    </Link>
                </div>
            </div>
        </div>
    );
}