import React from "react";
import SingleStat from "./SingleStat";

const StatsSection = () => {
  return (
    <div className="bg-urbancare-primary-blue h-fit">
      <div className="flex justify-center items-center gap-22 py-4">
        <SingleStat
          title="Documenti Gestiti"
          emoji="📄"
          number={1279}
          rightText="+"
        />
        <SingleStat
          title="Tempi medi risoluzione"
          emoji="⏱"
          number={24}
          rightText="h"
        />
        <SingleStat
          title="Gestione Digitale"
          emoji="💻"
          number={100}
          rightText="%"
        />
      </div>
    </div>
  );
};

export default StatsSection;
