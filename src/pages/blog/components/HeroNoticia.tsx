import { SquareArrowOutUpRight } from "lucide-react";
import { Link } from "react-router";
import { truncateDescription } from "../../../utils/truncateDescription";

interface HeroNoticiaProps {
    title: string;
    description: string;
    image: string;
    slug: string;
}

export function HeroNoticia({ title, description, image, slug }: HeroNoticiaProps) {
    return (
        <div>
            <div className="relative w-full md:w-2xl lg:w-5xl aspect-[16/9]">
                {image && (
                    <img
                        className="w-full h-full object-cover rounded-lg"
                        src={image}
                        alt="Hero Image"
                    />
                )}

                <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex-col justify-end items-start p-6">
                    <div className="w-full md:w-2/3">
                        <h3 className="text-white text-3xl font-bold uppercase">{title}</h3>
                        <p className="text-sm text-white">{truncateDescription(description)}</p>
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

            <div className="block md:hidden mt-4 px-2">
                <h3 className="text-black text-2xl font-bold uppercase">{title}</h3>
                <p className="text-sm text-white">{truncateDescription(description)}</p>
                <Link
                    className="bg-white text-green flex items-center mt-4 w-fit px-4 py-2 rounded-sm font-medium no-underline hover:bg-gray-800 transition-colors"
                    to={`/blog/${slug}`}
                >
                    VER MÁS
                    <SquareArrowOutUpRight className="stroke-green stroke-2 size-4 ml-2" />
                </Link>
            </div>
        </div>
    )
}