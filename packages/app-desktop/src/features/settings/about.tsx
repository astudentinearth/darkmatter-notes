import { useClientInfo } from "@renderer/hooks/query";
import { useTranslation } from "react-i18next";

export function AboutCard() {
  const data = useClientInfo();
  const { t } = useTranslation(undefined, { keyPrefix: "settings.about" });
  return (
    <div className="p-4 bg-card/80 rounded-2xl gap-4">
      <div className="grid grid-cols-[64px_1fr] grid-rows-[auto] gap-4">
        <img src="icon64.png" />
        <div>
          <h2 className="font-semibold text-xl">
            Darkwrite <span className="opacity-75">{data?.version}</span>
          </h2>
          <div className="opacity-50">
            electron {data?.electronVersion} | node {data?.nodeVersion} |{" "}
            {data?.os}
          </div>
          <div className="opacity-50">packaged: {String(data?.isPackaged)}</div>
          <div>
            <a
              target="_blank"
              href="https://github.com/astudentinearth/darkwrite"
              className="hover:underline"
            >
              {t("sourceCode")}
            </a>{" "}
            |{" "}
            <a
              target="_blank"
              href="https://github.com/astudentinearth/darkwrite/issues"
              className="hover:underline"
            >
              {t("reportBugs")}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
