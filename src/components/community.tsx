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
  const [repos, setRepos] = useState<Record<string, any | null> | null>(null);

  useEffect(() => {
    repositories.forEach((repo) => {
      fetch(`https://api.github.com/repos/wulkanowy/${repo}/contributors`)
        .then((res) => res.json())
        .then((data) => setRepos((prev) => ({ ...prev, [repo]: data })));
    });
  }, []);

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
      <div className="relative w-full bg-primary py-24 pt-60">
        <div className="container flex flex-col items-end justify-center">
          <h2
            data-aos="fade-up"
            className="pb-12 text-4xl font-semibold text-onPrimary"
          >
            Przez Uczniów, dla Uczniów
          </h2>
          <div className="grid w-full gap-8">
            {repositories.map((repo) => (
              <Accordion
                type="single"
                collapsible
                defaultValue={repo}
                key={repo}
              >
                <AccordionItem value={repo} className="rounded-3xl border-2">
                  <AccordionTrigger className=" rounded-t-3xl bg-onSurfaceVariant px-5 py-4 data-[state=closed]:rounded-b-3xl data-[state=open]:border-b-2">
                    <Link href={`https://github.com/wulkanowy/${repo}`}>
                      {beutifyRepoName(repo)}
                    </Link>
                  </AccordionTrigger>
                  <AccordionContent className="grid !pb-0 text-center [grid-template-columns:repeat(auto-fill,minmax(180px,1fr))]">
                    {repos?.[repo] !== null &&
                      repos?.[repo]?.map((contributor: any, index: number) => (
                        <Link
                          key={`${repo}-${index}`}
                          href={contributor.html_url}
                          className="flex items-center gap-2 border-onPrimary p-4 hover:bg-onSurface hover:bg-opacity-10"
                        >
                          <img
                            src={contributor.avatar_url}
                            alt={contributor.login}
                            className="rounded-full h-12 w-12 rounded-3xl"
                          />
                          <span className="text-onPrimary">
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
