import truncate from "truncate-html";
import { SquareArrowOutUpRight } from "lucide-react";
import { Link } from "react-router-dom";

interface HeroNoticiaProps {
    title: string;
    description: string;
    image: string;
    slug: string;
}

export function HeroNoticia({ title, description, image, slug }: HeroNoticiaProps) {

    const truncatedText = truncate(description, {
        length: 140,
        ellipsis: "..."
    })

    return (
        <div className="relative w-full md:w-2xl lg:w-5xl aspect-[16/9]">
            {image && (
                <img
                    className="w-full h-full object-cover rounded-lg"
                    src={image}
                    alt="Hero Image"
                />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end items-start p-6">
                <div className="w-full md:w-2/3">
                    <h3 className="text-white text-3xl font-bold uppercase">{title}</h3>
                    <p className="text-white mt-2 line-clamp-2 text-sm md:text-base" dangerouslySetInnerHTML={{
                        __html: truncatedText
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
        </div>
    )
}