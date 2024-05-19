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
    <div className="flex justify-center items-center fixed top-0 z-50 w-full">
      <div
        data-aos="fade-down"
        className="bg-surfaceContainer h-20 rounded-b-3xl flex items-center px-24"
      >
        <div className="flex gap-8">
          {paths.map((path, index) => (
            <div
              key={index}
              data-aos-delay={100 + index * 100}
              data-aos="fade-up"
            >
              <a
                href={path.path}
                className={`${
                  pathname == path.path && "!bg-primary !text-onPrimary"
                } px-6 hover:bg-primary hover:text-onPrimary transition-all py-3 font-medium text-onBackground rounded-button inline-flex gap-2`}
              >
                {path.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
