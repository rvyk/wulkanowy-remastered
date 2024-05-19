import { Download, Github } from "lucide-react";
import { useEffect, useState } from "react";
import Wave from "react-wavify";
import { Dialog, DialogContent } from "./ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import moment from "moment";
import { DevRelease, Release, RemoteDevRelease } from "@/types/github";

const Downloads: React.FC<{
  sectionsRef: React.MutableRefObject<HTMLDivElement[] | null>;
}> = ({ sectionsRef }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [releases, setReleases] = useState<Release[]>([]);
  const [devReleases, setDevReleases] = useState<DevRelease[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const releasesResponse = await fetch(
          "https://api.github.com/repos/wulkanowy/wulkanowy/releases"
        ).then((res) => res.json());
        setReleases(releasesResponse);
      } catch (e) {}

      try {
        const response = await fetch(
          "https://api.github.com/repos/wulkanowy/wulkanowy/pulls?state=open"
        );
        const data = await response.json();
        const devReleases = await Promise.all(
          data.map(async (release: RemoteDevRelease) => {
            const redirectorUrl = `https://manager.wulkanowy.net.pl/v1/build/app/daeff1893f3c8128/branch/${release.head.ref}`;
            const buildResponse = await fetch(redirectorUrl);
            const build = await buildResponse.json();
            if (!build.success) {
              return {
                title: release.title,
                number: release.number,
                github: release.html_url,
                avatar: release.user.avatar_url,
                user: release.user.login,
                commit: release.head.sha,
                id: release.id,
              };
            }
            return {
              title: release.title,
              number: release.number,
              github: release.html_url,
              released: build.data.finished_at,
              download: `https://manager.wulkanowy.net.pl/v1/download/app/daeff1893f3c8128/build/${build.data.build_slug}/artifact/${build.data.artifact_slug}`,
              url: build.data.build_slug,
              build: build.data.build_number,
              avatar: release.user.avatar_url,
              user: release.user.login,
              commit: release.head.sha,
              id: release.id,
            };
          })
        );
        setDevReleases(
          devReleases.sort((a, b) => {
            if (moment(a.released).isBefore(b.released)) return 1;
            if (moment(a.released).isAfter(b.released)) return -1;
            return 0;
          })
        );
      } catch (e) {}
    };

    fetchData();
  }, []);

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-surfaceContainerHigh p-6 pr-0 rounded-3xl text-onSurface">
          <Tabs defaultValue="stab">
            <TabsList className="mx-auto w-full justify-center items-center flex">
              <TabsTrigger
                value="stab"
                className="data-[state=inactive]:text-onSurfaceVariant flex-col data-[state=active]:text-primary group"
              >
                Wersje stabilne
                <div className="h-1 mt-2 rounded-t-button w-full bg-primary group-data-[state=active]:opacity-100 group-data-[state=inactive]:opacity-0 transition-all"></div>
              </TabsTrigger>
              <TabsTrigger
                value="dev"
                className="data-[state=inactive]:text-onSurfaceVariant flex-col data-[state=active]:text-primary group"
              >
                Wersje deweloperskie
                <div className="h-1 mt-2 rounded-t-button w-full bg-primary group-data-[state=active]:opacity-100 group-data-[state=inactive]:opacity-0 transition-all"></div>
              </TabsTrigger>
            </TabsList>
            <hr className="h-1 bg-surfaceContainerHighest w-full -mt-1 border-none" />
            <TabsContent
              value="stab"
              className="max-h-96 overflow-y-scroll pr-6"
            >
              <div className="grid gap-4 mt-6">
                {releases.length > 0 &&
                  releases?.map((release, index) => (
                    <div key={index} className="min-h-16">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-4">
                          <a
                            href={release.html_url}
                            target="_blank"
                            className="px-4 hover:bg-onSecondaryContainer py-3 bg-primary text-onPrimary transition-all font-medium rounded-button inline-flex gap-2"
                          >
                            <Github />
                          </a>
                          <div className="grid text-left">
                            <h2 className="font-medium">
                              Wersja {release.name}
                            </h2>
                            <p className="text-sm">
                              {moment(release.published_at)
                                .locale("pl")
                                .fromNow()}
                            </p>
                          </div>
                        </div>
                        <a href={release.assets[0].browser_download_url}>
                          <Download className="w-8 h-8" color="#FFB4A5" />
                        </a>
                      </div>
                      {index == releases.length - 1 ? null : (
                        <hr className="h-[2px] mt-4 bg-surfaceContainerHighest w-full border-none" />
                      )}
                    </div>
                  ))}
                {/* 
                <button className="px-6 py-3 w-fit mx-auto my-4 bg-primary hover:bg-onSecondaryContainer text-onPrimary transition-all font-medium rounded-button inline-flex gap-2">
                  Wczytaj więcej
                </button> */}
              </div>
            </TabsContent>
            <TabsContent
              value="dev"
              className="max-h-96 overflow-y-scroll pr-6"
            >
              <div className="grid gap-4 mt-6">
                {devReleases.length > 0 &&
                  devReleases?.map((release, index) => (
                    <div key={index} className="min-h-16">
                      <div className="flex items-center justify-between">
                        <div className="flex items-start gap-4">
                          <a
                            href={release.github}
                            target="_blank"
                            className="px-4 hover:bg-onSecondaryContainer py-3 bg-primary text-onPrimary transition-all font-medium rounded-button inline-flex gap-2"
                          >
                            <Github />
                          </a>
                          <div className="grid text-left">
                            <h2 className="font-medium">
                              {release.title}{" "}
                              <span className="font-normal text-onSurfaceVariant">
                                #{release.number}
                              </span>
                            </h2>
                            <div className="flex gap-2">
                              <p className="text-sm">
                                {moment(release.released)
                                  .locale("pl")
                                  .fromNow()}
                                ,
                              </p>
                              <a
                                href={release.github}
                                className="flex gap-2 w-fit items-center text-sm"
                              >
                                <img
                                  src={release.avatar}
                                  alt={release.user}
                                  className="w-5 h-5 rounded-3xl"
                                />
                                {release.user}
                              </a>
                            </div>
                          </div>
                        </div>
                        {release.download && (
                          <a href={release.download} target="_blank">
                            <Download className="w-8 h-8" color="#FFB4A5" />
                          </a>
                        )}
                      </div>
                      {index == devReleases.length - 1 ? null : (
                        <hr className="h-[2px] mt-4 bg-surfaceContainerHighest w-full border-none" />
                      )}
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
      <div
        id="pobieranie"
        ref={(el: HTMLDivElement | null) => {
          if (el) {
            sectionsRef.current?.push(el);
          }
        }}
      >
        <div className="w-full max-lg:px-6 relative py-24 bg-primary flex justify-center items-center flex-col">
          <h2
            data-aos="fade-up"
            className="text-4xl font-semibold text-onPrimary pb-12"
          >
            Pobierz aplikację
          </h2>
          <div className="flex gap-8 flex-wrap justify-center">
            <a
              href="https://play.google.com/store/apps/details?id=io.github.wulkanowy&utm_source=homepage"
              target="_blank"
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
            </a>
            <a
              href="https://appgallery.huawei.com/#/app/C101440411"
              target="_blank"
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
            </a>
            <a
              href="https://f-droid.org/packages/io.github.wulkanowy/"
              target="_blank"
              data-aos="fade-up"
              data-aos-delay="400"
              className="relative bg-background hover:bg-surfaceContainerHigh transition-colors px-6 py-3 rounded-button"
            >
              <div className="flex gap-4 items-center">
                <img src="/F-Droid_Logo_4.svg" alt="" className="w-8 h-8" />
                <div className="grid text-left text-onSecondaryContainer">
                  <p className="text-sm">POBIERZ Z</p>
                  <h2 className="text-xl font-medium">F-Droid</h2>
                </div>
              </div>
            </a>
            <button
              onClick={() => setIsDialogOpen(true)}
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
    </div>
  );
};

export default Downloads;
