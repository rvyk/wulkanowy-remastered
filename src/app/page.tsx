"use client";

import Community from "@/components/community";
import Downloads from "@/components/downloads";
import Functions from "@/components/functions";
import Hero from "@/components/hero";
import Message from "@/components/message";
import Navbar from "@/components/navbar";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [pathname, setPathname] = useState("");
  const sectionsRef = useRef([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust threshold as needed
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setPathname(window.location.pathname + "#" + entry.target.id);
        }
      });
    }, options);

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      if (sectionsRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        sectionsRef.current.forEach((section) => {
          if (section) observer.unobserve(section);
        });
      }
    };
  }, []);

  return (
    <div className="min-h-screen w-full">
      <Message />
      <Navbar {...{ pathname, setPathname }} />
      <Hero {...{ sectionsRef }} />
      <Downloads {...{ sectionsRef }} />
      <Functions {...{ sectionsRef }} />
      <Community />
    </div>
  );
}
