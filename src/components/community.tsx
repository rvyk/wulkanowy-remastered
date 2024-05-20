"use client";

import { beutifyRepoName } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import Wave from "react-wavify";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const repositories = [
  "wulkanowy",
  "fake-log",
  "wulkabot",
  "wulkanowy-manager-server",
];

const Community = () => {
  const [repos, setRepos] = useState<Record<
    string,
    Contributor[] | null
  > | null>(null);

  useEffect(() => {
    try {
      repositories.forEach((repo) => {
        fetch(`https://api.github.com/repos/wulkanowy/${repo}/contributors`)
          .then((res) => res.json())
          .then((data: Contributor[]) => {
            const filteredData = data.filter((contributor) => !contributor.html_url.includes("apps/"));
            setRepos((prev) => ({ ...prev, [repo]: filteredData }));
          });
      });
    } catch (e) {}
  }, []);

  if (!repos) return null;

  return (
    <div
      id="community"
      ref={(el: HTMLDivElement | null) => {
        if (el) {
          // sectionsRef.current?.push(el);
        }
      }}
      className="relative"
    >
      <Wave
        fill="#200F0B"
        paused={false}
        className="absolute -top-1 z-10 w-full rotate-180"
        options={{
          height: 20,
          amplitude: 50,
          speed: 0.15,
          points: 6,
        }}
      />
      <div className="relative w-full bg-surfaceContainer py-24 pt-60">
        <div className="container px-6 flex flex-col justify-center">
          <h2
            data-aos="fade-right"
            className="pb-12 text-4xl max-lg:text-center font-semibold text-onSurface"
          >
            Przez Uczniów, dla Uczniów
          </h2>
          <div data-aos="fade-up" className="grid w-full gap-8">
            {repositories.map((repo) => (
              <Accordion
                type="single"
                collapsible
                defaultValue={repo}
                key={repo}
              >
                <AccordionItem value={repo} className="rounded-t-3xl rounded-b-3xl overflow-hidden border border-surfaceContainer">
                  <AccordionTrigger className="bg-surfaceContainerLow text-onSurface font-medium px-5 py-6 data-[state=open]:border-b border-surfaceContainer">
                    <Link href={`https://github.com/wulkanowy/${repo}`} className="hover:underline text-lg" target="_blank">
                      {beutifyRepoName(repo)}
                    </Link>
                  </AccordionTrigger>
                  <AccordionContent className="grid rounded-b-3xl bg-surfaceContainerHigh overflow-hidden !pb-0 text-center [grid-template-columns:repeat(auto-fill,minmax(180px,1fr))] -mb-[1px] -mr-[1px]">
                    {repos?.[repo] !== null &&
                      repos?.[repo]?.map((contributor, index) => (
                        <Link
                          key={`${repo}-${index}`}
                          target="_blank"
                          href={contributor.html_url}
                          className="flex items-center text-left gap-4 p-4 border-r border-surfaceContainer border-b hover:bg-onSurface transition-all hover:bg-opacity-10"
                        >
                          <img
                            src={contributor.avatar_url}
                            alt={contributor.login}
                            className="rounded-full h-10 w-10 rounded-3xl"
                          />
                          <span className="text-onSurface font-medium">
                            {contributor.login}
                          </span>
                        </Link>
                      ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
