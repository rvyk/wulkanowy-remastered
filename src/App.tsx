import { useEffect, useRef, useState } from "react";
import Downloads from "./components/downloads";
import Functions from "./components/functions";
import Hero from "./components/hero";
import Message from "./components/message";
import Navbar from "./components/navbar";

function App() {
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
          window.history.replaceState(null, "", "#" + entry.target.id);
        }
      });
    }, options);

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      if (sectionsRef.current) {
        sectionsRef.current.forEach((section) => {
          if (section) observer.unobserve(section);
        });
      }
    };
  }, []);

  return (
    <div className="bg-surface h-screen w-full">
      <Message />
      <Navbar {...{ pathname, setPathname }} />
      <Hero {...{ sectionsRef }} />
      <Downloads {...{ sectionsRef }} />
      <Functions {...{ sectionsRef }} />
    </div>
  );
}

export default App;
