"use client";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import Link from "next/link";
import { beutifyRepoName } from "@/lib/utils";
import Wave from "react-wavify";

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
        className="absolute -top-1 w-full z-10 rotate-180"
        options={{
          height: 20,
          amplitude: 50,
          speed: 0.15,
          points: 6,
        }}
      />
      <div className="w-full relative py-24 pt-60 bg-primary">
        <div className="flex flex-col items-end justify-center container">
          <h2
            data-aos="fade-up"
            className="text-4xl font-semibold text-onPrimary pb-12"
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
                <AccordionItem value={repo} className="border-2 rounded-3xl">
                  <AccordionTrigger className=" px-5 py-4 bg-onSurfaceVariant rounded-t-3xl data-[state=closed]:rounded-b-3xl data-[state=open]:border-b-2">
                    <Link href={`https://github.com/wulkanowy/${repo}`}>
                      {beutifyRepoName(repo)}
                    </Link>
                  </AccordionTrigger>
                  <AccordionContent className="!pb-0 grid [grid-template-columns:repeat(auto-fill,minmax(180px,1fr))] text-center">
                    {repos?.[repo] !== null &&
                      repos?.[repo]?.map((contributor: any, index: number) => (
                        <Link
                          key={`${repo}-${index}`}
                          href={contributor.html_url}
                          className="flex items-center gap-2 p-4 border-onPrimary hover:bg-onSurface hover:bg-opacity-10"
                        >
                          <img
                            src={contributor.avatar_url}
                            alt={contributor.login}
                            className="w-12 h-12 rounded-3xl rounded-full"
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
