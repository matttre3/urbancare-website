import React from "react";
import { Clock3, FileText, MonitorCheck } from "lucide-react";
import SingleStat from "./SingleStat";

const StatsSection = () => {
  return (
    <div className="bg-urbancare-primary-blue h-fit">
      <div className="flex md:flex-row flex-col justify-center items-center gap-6 md:gap-22 py-10">
        <SingleStat
          title="Documenti Gestiti"
          icon={<FileText aria-hidden="true" />}
          number={1279}
          rightText="+"
        />
        <SingleStat
          title="Tempi medi risoluzione"
          icon={<Clock3 aria-hidden="true" />}
          number={24}
          rightText="h"
        />
        <SingleStat
          title="Gestione Digitale"
          icon={<MonitorCheck aria-hidden="true" />}
          number={100}
          rightText="%"
        />
      </div>
    </div>
  );
};

export default StatsSection;
