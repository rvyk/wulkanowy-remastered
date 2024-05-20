import useBetterMediaQuery from "@/hooks/use-media-query";
import { DevRelease, Release, RemoteDevRelease } from "@/types/github";
import { CircleOff, Download, Github } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Wave from "react-wavify";
import { Dialog, DialogContent } from "./ui/dialog";
import { Drawer, DrawerContent } from "./ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const Downloads: React.FC<{
  sectionsRef: React.MutableRefObject<HTMLDivElement[] | null>;
}> = ({ sectionsRef }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [releases, setReleases] = useState<Release[]>([]);
  const [devReleases, setDevReleases] = useState<DevRelease[]>([]);
  const isDesktop = useBetterMediaQuery("(min-width: 768px)");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const releasesResponse = await fetch(
          "https://api.github.com/repos/wulkanowy/wulkanowy/releases",
        ).then((res) => res.json());
        setReleases(releasesResponse);
      } catch (e) {}

      try {
        const response = await fetch(
          "https://api.github.com/repos/wulkanowy/wulkanowy/pulls?state=open",
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
          }),
        );
        setDevReleases(
          devReleases.sort((a, b) => {
            if (moment(a.released).isBefore(b.released)) return 1;
            if (moment(a.released).isAfter(b.released)) return -1;
            return 0;
          }),
        );
      } catch (e) {}
    };

    fetchData();
  }, []);

  return (
    <div>
      {isDesktop ? (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="rounded-3xl bg-surfaceContainerHigh p-6 pr-0 text-onSurface">
            <Content {...{ releases, devReleases }} />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DrawerContent className="rounded-3xl bg-surfaceContainerHigh text-onSurface">
            <Content {...{ releases, devReleases }} />
          </DrawerContent>
        </Drawer>
      )}
      <div
        id="pobieranie"
        ref={(el: HTMLDivElement | null) => {
          if (el) {
            sectionsRef.current?.push(el);
          }
        }}
      >
        <div className="relative flex w-full flex-col items-center justify-center bg-primary py-24 max-lg:px-6">
          <h2
            data-aos="fade-up"
            className="pb-12 text-4xl font-semibold text-onPrimary"
          >
            Pobierz aplikację
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            <a
              href="https://play.google.com/store/apps/details?id=io.github.wulkanowy&utm_source=homepage"
              target="_blank"
              data-aos="fade-up"
              data-aos-delay="200"
              className="relative rounded-button bg-background px-6 py-3 transition-colors hover:bg-surfaceContainerHigh"
            >
              <div className="flex items-center gap-4">
                <img
                  src="/playstore-svgrepo-com.svg"
                  alt=""
                  className="h-8 w-8"
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
              className="relative rounded-button bg-background px-6 py-3 transition-colors hover:bg-surfaceContainerHigh"
            >
              <div className="flex items-center gap-4">
                <img src="/Huawei_AppGallery.svg" alt="" className="h-8 w-8" />
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
              className="relative rounded-button bg-background px-6 py-3 transition-colors hover:bg-surfaceContainerHigh"
            >
              <div className="flex items-center gap-4">
                <img src="/F-Droid_Logo_4.svg" alt="" className="h-8 w-8" />
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
              className="relative rounded-button bg-background px-6 py-3 transition-colors hover:bg-surfaceContainerHigh"
            >
              <div className="flex items-center gap-4">
                <Download className="h-8 w-8" color="#FFB4A5" />
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
          className="z-10 w-full rotate-180"
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

const Content: React.FC<{ releases: Release[]; devReleases: DevRelease[] }> = ({
  releases,
  devReleases,
}) => {
  return (
    <Tabs defaultValue="stab">
      <TabsList className="mx-auto flex w-full items-center justify-center">
        <TabsTrigger
          value="stab"
          className="group flex-col data-[state=active]:text-primary data-[state=inactive]:text-onSurfaceVariant"
        >
          Wersje stabilne
          <div className="mt-2 h-1 w-full rounded-t-button bg-primary transition-all group-data-[state=active]:opacity-100 group-data-[state=inactive]:opacity-0"></div>
        </TabsTrigger>
        <TabsTrigger
          value="dev"
          className="group flex-col data-[state=active]:text-primary data-[state=inactive]:text-onSurfaceVariant"
        >
          Wersje deweloperskie
          <div className="mt-2 h-1 w-full rounded-t-button bg-primary transition-all group-data-[state=active]:opacity-100 group-data-[state=inactive]:opacity-0"></div>
        </TabsTrigger>
      </TabsList>
      <hr className="-mt-1 h-1 w-full border-none bg-surfaceContainerHighest" />
      <TabsContent value="stab" className="max-h-96 overflow-y-scroll pr-6">
        <div className="mt-6 grid gap-4">
          {releases.length > 0 ? (
            releases?.map((release, index) => (
              <div key={index} className="min-h-16">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <a
                      href={release.html_url}
                      target="_blank"
                      className="inline-flex gap-2 rounded-button bg-primary px-4 py-3 font-medium text-onPrimary transition-all hover:bg-onSecondaryContainer"
                    >
                      <Github />
                    </a>
                    <div className="grid text-left">
                      <h2 className="font-medium">Wersja {release.name}</h2>
                      <p className="text-sm">
                        {moment(release.published_at).locale("pl").fromNow()}
                      </p>
                    </div>
                  </div>
                  <a href={release.assets[0].browser_download_url}>
                    <Download className="h-8 w-8" color="#FFB4A5" />
                  </a>
                </div>
                {index == releases.length - 1 ? null : (
                  <hr className="mt-4 h-[2px] w-full border-none bg-surfaceContainerHighest" />
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center gap-4">
              <CircleOff className="h-16 w-16" color="#FFB4A5" />
              <p>Brak wersji stabilnych</p>
            </div>
          )}
          {/* 
        <button className="px-6 py-3 w-fit mx-auto my-4 bg-primary hover:bg-onSecondaryContainer text-onPrimary transition-all font-medium rounded-button inline-flex gap-2">
          Wczytaj więcej
        </button> */}
        </div>
      </TabsContent>
      <TabsContent value="dev" className="max-h-96 overflow-y-scroll pr-6">
        <div className="mt-6 grid gap-4">
          {devReleases.length > 0 ? (
            devReleases?.map((release, index) => (
              <div key={index} className="min-h-16">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4">
                    <a
                      href={release.github}
                      target="_blank"
                      className="inline-flex gap-2 rounded-button bg-primary px-4 py-3 font-medium text-onPrimary transition-all hover:bg-onSecondaryContainer"
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
                          {moment(release.released).locale("pl").fromNow()},
                        </p>
                        <a
                          href={release.github}
                          className="flex w-fit items-center gap-2 text-sm"
                        >
                          <img
                            src={release.avatar}
                            alt={release.user}
                            className="h-5 w-5 rounded-3xl"
                          />
                          {release.user}
                        </a>
                      </div>
                    </div>
                  </div>
                  {release.download && (
                    <a href={release.download} target="_blank">
                      <Download className="h-8 w-8" color="#FFB4A5" />
                    </a>
                  )}
                </div>
                {index == devReleases.length - 1 ? null : (
                  <hr className="mt-4 h-[2px] w-full border-none bg-surfaceContainerHighest" />
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center gap-4">
              <CircleOff className="h-16 w-16" color="#FFB4A5" />
              <p>Brak wersji deweloperskich</p>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default Downloads;
