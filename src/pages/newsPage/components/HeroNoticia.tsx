import { SquareArrowOutUpRight } from "lucide-react";
import { Link } from "react-router-dom";

type HeroNoticiaProps = {
    title: string;
    description: string;
    image: string;
    slug: string;
}

export function HeroNoticia({ title, description, image, slug }: HeroNoticiaProps) {
    return (
        <div className="relative w-6xl aspect-[16/9] flex flex-col align-middle">
            {image && (
                <img
                    className="w-full h-full object-cover" // Cambiado a object-cover para mejor ajuste
                    src={image}
                    alt="Hero Image"
                />
            )}

            {/* Overlay con texto en esquina inferior izquierda */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end items-start p-6 w-1/2">
                <h3 className="text-white text-3xl font-bold uppercase">{title}</h3>
                <p className="text-white mt-2 line-clamp-2" dangerouslySetInnerHTML={{
                    __html: description.length > 140
                        ? `${description.substring(0, 140)}...`
                        : description
                }}></p>
                <Link
                    className="bg-white text-black flex items-center mt-4 w-fit px-4 py-2 rounded-sm font-medium no-underline hover:bg-gray-100 transition-colors"
                    to={`/blog/${slug}`}
                >
                    VER MÁS
                    <SquareArrowOutUpRight className="stroke-green stroke-2 size-4 ml-2" />
                </Link>
            </div>
        </div>
    )
}