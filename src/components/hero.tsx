import { Download, MessageCircleQuestion } from "lucide-react";
import Wave from "react-wavify";

const Hero: React.FC<{
  sectionsRef: React.MutableRefObject<HTMLDivElement[] | null>;
}> = ({ sectionsRef }) => {
  return (
    <div
      id="top"
      ref={(el) => sectionsRef.current?.push(el!)}
      className="relative h-full"
    >
      <img
        src="/wulkanowy-logo-black.svg"
        className="w-full h-full absolute opacity-[0.01]"
        alt=""
      />
      <div className="container relative z-20 gap-48 grid grid-cols-2 items-center h-full">
        <div className="grid gap-8 h-fit justify-end">
          <p
            data-aos="fade-right"
            className="font-medium bg-primary text-onPrimary rounded-3xl py-3 px-6 w-fit"
          >
            Najnowsza wersja to <span className="font-semibold">2.6.1</span>!
          </p>
          <div className="grid gap-4">
            <h1
              data-aos="fade-right"
              data-aos-delay="200"
              className="text-5xl font-semibold text-onSurface"
            >
              Wulkanowy{" "}
              <span className="text-onSurfaceVariant font-bold">
                Dzienniczek
              </span>
            </h1>
            <p
              data-aos="fade-right"
              data-aos-delay="300"
              className="text-xl text-onSurface"
            >
              Nieoficjalny androidowy klient dziennika <br />
              <span className="font-medium text-primary">
                VULCAN UONET+
              </span>{" "}
              dla ucznia i rodzica
            </p>
          </div>
          <div className="flex space-x-6">
            <div data-aos="fade-up" data-aos-delay="400">
              <button className="px-6 py-3 font-medium bg-primary hover:bg-onSecondaryContainer transition-all text-onPrimary rounded-button inline-flex items-center gap-2">
                <Download /> Pobierz
              </button>
            </div>
            <div data-aos="fade-up" data-aos-delay="500">
              <button className="px-6 py-3 font-medium hover:bg-primary hover:text-onPrimary hover:border-transparent transition-all border-outline border-2 text-onSecondaryContainer rounded-button items-center inline-flex gap-2">
                <MessageCircleQuestion /> Często zadawane pytania
              </button>
            </div>
          </div>
        </div>
        <div className="grid justify-center">
          <div data-aos="fade-left" data-aos-delay="600">
            <div className="relative float border-onSurface dark:border-onSurface bg-onSurface border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
              <div className="h-[32px] w-[3px] bg-onSurface dark:bg-onSurface absolute -start-[17px] top-[72px] rounded-s-lg"></div>
              <div className="h-[46px] w-[3px] bg-onSurface dark:bg-onSurface absolute -start-[17px] top-[124px] rounded-s-lg"></div>
              <div className="h-[46px] w-[3px] bg-onSurface dark:bg-onSurface absolute -start-[17px] top-[178px] rounded-s-lg"></div>
              <div className="h-[64px] w-[3px] bg-onSurface dark:bg-onSurface absolute -end-[17px] top-[142px] rounded-e-lg"></div>
              <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-onSurface">
                <img
                  src="https://raw.githubusercontent.com/wulkanowy/branding/master/wulkanowy/2.6.0/screenshots/03%203.png"
                  className="w-[272px] h-[572px]"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Wave
        fill="#FFB4A5"
        paused={false}
        className="absolute bottom-0 w-full z-10"
        options={{
          height: 20,
          amplitude: 50,
          speed: 0.15,
          points: 6,
        }}
      />
    </div>
  );
};

export default Hero;
