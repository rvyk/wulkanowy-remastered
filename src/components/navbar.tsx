"use client";

import Link from "next/link";
import { useEffect } from "react";

const paths = [
  {
    path: "/#top",
    name: "Wulkanowy",
  },
  {
    path: "/#pobieranie",
    name: "Pobieranie",
  },
  {
    path: "/#porownanie",
    name: "Porównanie funkcji",
  },
  {
    path: "/#kontakt",
    name: "Kontakt",
  },
];

const Navbar: React.FC<{
  pathname: string;
  setPathname: React.Dispatch<React.SetStateAction<string>>;
}> = ({ pathname, setPathname }) => {
  useEffect(() => {
    const updatePath = () => {
      setPathname(window.location.pathname + window.location.hash);
    };

    updatePath();

    window.addEventListener("hashchange", updatePath);

    return () => {
      window.removeEventListener("hashchange", updatePath);
    };
  }, [setPathname]);

  return (
    <div className="fixed top-0 z-50 flex w-full items-center justify-center max-lg:hidden">
      <div
        data-aos="fade-down"
        className="flex h-20 items-center rounded-b-3xl bg-surfaceContainer px-24"
      >
        <div className="flex gap-8">
          {paths.map((path, index) => (
            <div
              key={index}
              data-aos-delay={100 + index * 100}
              data-aos="fade-up"
            >
              <Link
                href={path.path}
                className={`${
                  pathname == path.path && "!bg-primary !text-onPrimary"
                } inline-flex gap-2 rounded-button px-6 py-3 font-medium text-onBackground transition-all hover:bg-primary hover:text-onPrimary`}
              >
                {path.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
