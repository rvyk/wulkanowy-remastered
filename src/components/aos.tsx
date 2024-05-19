"use client";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function AOSInitialize() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      delay: 50,
      once: true,
      easing: "ease-out-back",
    });
  }, []);

  return null;
}
