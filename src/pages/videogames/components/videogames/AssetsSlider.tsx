import { Asset } from '../../../../models/asset.interface';
import { VideoGame } from '../../../../models/video-game.interface';
import { useAssetsSlider } from '../../hooks/videogames/useAssetsSlider';

export function AssetsSlider({ videoGame }: { videoGame: VideoGame }) {
    const slider = useAssetsSlider(videoGame);
    if (!slider) return null;
    const { titulo, assets, currentIndex, handleSelectAsset } = slider;

    return (
        <section className="flex flex-wrap items-start gap-4">
            <div className="md:bg-placeholder relative h-auto w-full overflow-hidden rounded-lg md:aspect-video xl:flex-1">
                <figure className="relative z-0 w-full">
                    <img src={assets[currentIndex].url} alt={assets[currentIndex].title} className="w-full" />
                </figure>
                <div className="absolute bottom-0 left-0 z-10 max-w-2/3 p-8 max-md:hidden">
                    <h2 className="leading-none">{titulo}</h2>
                </div>
                <span className="to-body/70 absolute inset-0 z-0 h-full w-full bg-linear-to-b from-transparent max-md:hidden"></span>
            </div>

            <div className="grid w-full grid-cols-4 gap-1.5 md:gap-4 xl:max-w-1/6 xl:grid-cols-1 xl:grid-rows-4">
                {assets.map((asset: Asset, index: number) => (
                    <div className="group font-oswald relative flex flex-col gap-2" key={asset.id}>
                        <figure className="bg-placeholder relative aspect-video h-auto w-full overflow-hidden rounded">
                            <img src={asset.url} alt={asset.title} className="w-full" />

                            <span
                                className={`bg-green absolute bottom-0 left-0 h-1 w-0 transition-all ease-linear ${index === currentIndex ? 'w-full! duration-[5000ms]' : ''}`}
                            ></span>
                        </figure>

                        <button
                            className="hover:text-green cursor-pointer text-center text-sm transition-colors"
                            onClick={() => handleSelectAsset(index)}
                        >
                            <span className="absolute inset-0"></span>
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}
