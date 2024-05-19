import { Download } from "lucide-react";
import Wave from "react-wavify";

const Downloads: React.FC<{
  sectionsRef: React.MutableRefObject<HTMLDivElement[] | null>;
}> = ({ sectionsRef }) => {
  return (
    <div id="pobieranie" ref={(el) => sectionsRef.current?.push(el!)}>
      <div className="w-full relative py-24 bg-primary flex justify-center items-center flex-col">
        <h2
          data-aos="fade-up"
          className="text-4xl font-semibold text-onPrimary pb-12"
        >
          Pobierz aplikację
        </h2>
        <div className="flex gap-8">
          <button
            data-aos="fade-up"
            data-aos-delay="200"
            className="relative bg-background hover:bg-surfaceContainerHigh transition-colors px-6 py-3 rounded-button"
          >
            <div className="flex gap-4 items-center">
              <img
                src="/playstore-svgrepo-com.svg"
                alt=""
                className="w-8 h-8"
              />
              <div className="grid text-left text-onSecondaryContainer">
                <p className="text-sm">POBIERZ Z</p>
                <h2 className="text-xl font-medium">Google Play</h2>
              </div>
            </div>
          </button>
          <button
            data-aos="fade-up"
            data-aos-delay="300"
            className="relative bg-background hover:bg-surfaceContainerHigh transition-colors px-6 py-3 rounded-button"
          >
            <div className="flex gap-4 items-center">
              <img src="/Huawei_AppGallery.svg" alt="" className="w-8 h-8" />
              <div className="grid text-left text-onSecondaryContainer">
                <p className="text-sm">POBIERZ Z</p>
                <h2 className="text-xl font-medium">AppGallery</h2>
              </div>
            </div>
          </button>
          <button className="relative bg-background hover:bg-surfaceContainerHigh transition-colors px-6 py-3 rounded-button">
            <div className="flex gap-4 items-center">
              <img src="/F-Droid_Logo_4.svg" alt="" className="w-8 h-8" />
              <div className="grid text-left text-onSecondaryContainer">
                <p className="text-sm">POBIERZ Z</p>
                <h2 className="text-xl font-medium">F-Droid</h2>
              </div>
            </div>
          </button>
          <button
            data-aos="fade-up"
            data-aos-delay="500"
            className="relative bg-background hover:bg-surfaceContainerHigh transition-colors px-6 py-3 rounded-button"
          >
            <div className="flex gap-4 items-center">
              <Download className="w-8 h-8" color="#FFB4A5" />
              <div className="grid text-left text-onSecondaryContainer">
                <p className="text-sm">POBIERZ Z</p>
                <h2 className="text-xl font-medium">Inne opcje</h2>
              </div>
            </div>
          </button>
        </div>
      </div>
      <Wave
        fill="#FFB4A5"
        paused={false}
        className="w-full z-10 rotate-180"
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

export default Downloads;
