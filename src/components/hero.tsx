"use client";

import { Download, MessageCircleQuestion } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Wave from "react-wavify";

const Hero: React.FC<{
  sectionsRef: React.MutableRefObject<HTMLDivElement[] | null>;
}> = ({ sectionsRef }) => {
  const [latestVersion, setLatestVersion] = useState<string | null>(null);
  useEffect(() => {
    fetch("https://api.github.com/repos/wulkanowy/wulkanowy/releases/latest")
      .then((res) => res.json())
      .then((data) => setLatestVersion(data.tag_name));
  }, []);

  return (
    <div
      id="top"
      ref={(el: HTMLDivElement | null) => {
        if (el) {
          sectionsRef.current?.push(el);
        }
      }}
      className="relative h-full min-h-screen"
    >
      <img
        src="/wulkanowy-logo-black.svg"
        className="absolute h-full w-full opacity-[0.01]"
        alt=""
      />
      <div className="container z-20 flex min-h-screen grid-cols-2 flex-col items-center justify-center gap-24 px-6 max-lg:pt-16 lg:grid">
        <div className="grid h-fit gap-8">
          {latestVersion && (
            <p
              data-aos="fade-right"
              className="w-fit rounded-3xl bg-primary px-6 py-3 font-medium text-onPrimary transition-all max-lg:mx-auto"
            >
              Najnowsza wersja to{" "}
              <span className="font-semibold">{latestVersion}</span>!
            </p>
          )}
          <div className="grid gap-4 max-lg:text-center">
            <h1
              data-aos="fade-right"
              data-aos-delay="200"
              className="text-5xl font-semibold text-onSurface lg:whitespace-nowrap"
            >
              Wulkanowy{" "}
              <span className="font-bold text-onSurfaceVariant">
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
          <div className="flex gap-x-6 max-lg:flex-col max-lg:items-center max-lg:gap-y-4">
            <div data-aos="fade-up" data-aos-delay="400">
              <Link
                href="/#pobieranie"
                className="inline-flex items-center gap-2 rounded-button bg-primary px-6 py-3 font-medium text-onPrimary transition-all hover:bg-onSecondaryContainer"
              >
                <Download /> Pobierz
              </Link>
            </div>
            <div data-aos="fade-up" data-aos-delay="500">
              <Link
                href="/#faq"
                className="inline-flex items-center gap-2 rounded-button border-2 border-outline px-6 py-3 font-medium text-onSecondaryContainer transition-all hover:border-primary hover:bg-primary hover:text-onPrimary"
              >
                <MessageCircleQuestion /> Często zadawane pytania
              </Link>
            </div>
          </div>
        </div>
        <div className="grid justify-end">
          <div data-aos="fade-up" data-aos-delay="600">
            <div className="float relative h-[600px] max-w-[300px] rounded-[2.5rem] border-[14px] border-onSurface bg-onSurface dark:border-onSurface">
              <div className="rounded-s-lg absolute -start-[17px] top-[72px] h-[32px] w-[3px] bg-onSurface dark:bg-onSurface"></div>
              <div className="rounded-s-lg absolute -start-[17px] top-[124px] h-[46px] w-[3px] bg-onSurface dark:bg-onSurface"></div>
              <div className="rounded-s-lg absolute -start-[17px] top-[178px] h-[46px] w-[3px] bg-onSurface dark:bg-onSurface"></div>
              <div className="rounded-e-lg absolute -end-[17px] top-[142px] h-[64px] w-[3px] bg-onSurface dark:bg-onSurface"></div>
              <div className="bg-white h-[572px] w-[272px] overflow-hidden rounded-[2rem] dark:bg-onSurface">
                <img
                  src="https://raw.githubusercontent.com/wulkanowy/branding/master/wulkanowy/2.6.0/screenshots/03%203.png"
                  className="h-[572px] w-[272px]"
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
        className="absolute bottom-0 z-10 w-full"
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
