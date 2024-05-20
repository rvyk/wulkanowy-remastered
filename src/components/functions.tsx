import { CheckIcon, X } from "lucide-react";

const features = [
  {
    feature: "Średnia ocen",
    uonet: "Zależy od ustawień szkoły",
    vulcan: "Zależy od ustawień szkoły",
    wulkanowy: "Dostępne",
  },
  {
    feature: "Frekwencja (widok dni)",
    uonet: "Dostępne",
    vulcan: "Dostępne",
    wulkanowy: "Dostępne",
  },
  {
    feature: "Frekwencja (podsumowanie)",
    uonet: "Dostępne",
    vulcan: "Dostępne",
    wulkanowy: "Dostępne",
  },
  {
    feature: "Uwagi",
    uonet: "Dostępne",
    vulcan: "Dostępne",
    wulkanowy: "Dostępne",
  },
  {
    feature: "Uczeń na tle klasy",
    uonet: "Dostępne",
    vulcan: "Nie dostępne",
    wulkanowy: "Dostępne",
  },
  {
    feature: "Dane ucznia",
    uonet: "Dostępne",
    vulcan: "Nie dostępne",
    wulkanowy: "Dostępne",
  },
  {
    feature: "Dane szkoły",
    uonet: "Dostępne",
    vulcan: "Częściowa obsługa",
    wulkanowy: "Dostępne",
  },
  {
    feature: "Nauczyciele",
    uonet: "Dostępne",
    vulcan: "Dostępne",
    wulkanowy: "Dostępne",
  },
  {
    feature: "Lekcje zrealizowane",
    uonet: "Dostępne",
    vulcan: "Dostępne",
    wulkanowy: "Dostępne",
  },
  {
    feature: "Wiadomości",
    uonet: "Dostępne",
    vulcan: "Dostępne",
    wulkanowy: "Dostępne",
  },
  {
    feature: "Usprawiedliwienia",
    uonet: "Dostępne",
    vulcan: "Dostępne",
    wulkanowy: "Dostępne",
  },
  {
    feature: "Szczęśliwy numerek",
    uonet: "Dostępne",
    vulcan: "Dostępne",
    wulkanowy: "Dostępne",
  },
  {
    feature: "Powiadomienia o nadchodzących lekcjach",
    uonet: "Nie dotyczy",
    vulcan: "Nie dostępne",
    wulkanowy: "Dostępne",
  },
  {
    feature: "Oznaczanie zadań jako wykonane",
    uonet: "Dostępne",
    vulcan: "Nie dostępne",
    wulkanowy: "Dostępne",
  },
  {
    feature: "Szybkie skróty po przytrzymaniu aplikacji",
    uonet: "Nie dotyczy",
    vulcan: "Nie dostępne",
    wulkanowy: "Dostępne",
  },
  {
    feature: "Logowanie za pomocą loginu i hasła",
    uonet: "Dostępne",
    vulcan: "Nie dostępne",
    wulkanowy: "Dostępne",
  },
];

const Functions: React.FC<{
  sectionsRef: React.MutableRefObject<HTMLDivElement[] | null>;
}> = ({ sectionsRef }) => {
  return (
    <div
      id="porownanie"
      ref={(el: HTMLDivElement | null) => {
        if (el) {
          sectionsRef.current?.push(el);
        }
      }}
      className="-mt-24 bg-surface py-48 "
    >
      <div className="container overflow-hidden px-6">
        <h2
          data-aos="fade-right"
          className="pb-12 text-center text-4xl font-semibold text-onSurface"
        >
          Porównaj funkcje różnych aplikacji
        </h2>
        <div
          data-aos="fade-up"
          data-aos-delay="200"
          className="w-full max-lg:overflow-x-scroll"
        >
          <table className="w-full">
            <thead className="">
              <tr className="">
                <th className="rounded-tl-3xl bg-surfaceContainerHighest px-6 py-6 text-lg text-onBackground">
                  Funkcja
                </th>
                <th className="bg-surfaceContainerHighest px-6 py-6 text-lg text-onBackground">
                  Strona UONET+
                </th>
                <th className="bg-surfaceContainerHighest px-6 py-6 text-lg text-onBackground">
                  Dzienniczek VULCAN
                </th>
                <th className="rounded-tr-3xl bg-surfaceContainerLow  px-6 py-6 text-lg text-onSurfaceVariant">
                  Wulkanowy
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 == 0
                      ? "bg-surfaceVariant"
                      : "bg-surfaceContainerHighest"
                  } px-6 py-3 text-center text-onBackground`}
                >
                  <td
                    className={`${
                      index == features.length - 1 && "rounded-bl-3xl"
                    } px-5 py-5 text-center font-medium`}
                  >
                    {feature.feature}
                  </td>
                  <td className="px-5 py-5 text-center font-medium">
                    <div className="grid place-items-center">
                      {FeatureToIcon({ feature: feature.uonet })}
                    </div>
                  </td>
                  <td className="px-5 py-5 text-center font-medium">
                    <div className="grid place-items-center">
                      {FeatureToIcon({ feature: feature.vulcan })}
                    </div>
                  </td>
                  <td
                    className={`${
                      index % 2 != 0
                        ? "bg-surfaceContainerLow"
                        : "bg-surfaceContainerHigh"
                    } ${
                      index == features.length - 1 && "rounded-br-3xl"
                    } px-5 py-5 text-center font-medium`}
                  >
                    <div className="grid place-items-center">
                      {FeatureToIcon({ feature: feature.wulkanowy })}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const FeatureToIcon = ({ feature }: { feature: string }) => {
  switch (feature) {
    case "Dostępne":
      return <CheckIcon />;
    case "Nie dostępne":
      return <X />;
    default:
      return <p>{feature}</p>;
  }
};

export default Functions;
