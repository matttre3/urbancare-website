"use client";

import type { ReactNode } from "react";
import CountUp from "./react-bits/CountUp";
import { Text } from "./Text";

interface SingleStatProps {
  title: string;
  icon: ReactNode;
  number: number;
  rightText?: string;
}

export default function SingleStat({
  title,
  icon,
  number,
  rightText,
}: SingleStatProps) {
  return (
    <div className="text-white text-center flex min-w-48 flex-col items-center gap-0">
      <div className="mb-3 grid size-12 place-items-center rounded-lg bg-white/10 text-urbancare-tertiary-blue">
        {icon}
      </div>
      <div className="text-3xl font-bold  flex items-center justify-center">
        <CountUp
          className="text-6xl! tracking-wide font-poppins text-urbancare-tertiary-blue font-semibold"
          to={number}
          duration={0.5}
        />

        {rightText && (
          <Text className=" text-6xl! font-poppins text-urbancare-tertiary-blue font-semibold leading-0">
            {rightText}
          </Text>
        )}
      </div>
      <Text size="p" align="center" className="text-white">
        {title}
      </Text>
    </div>
  );
}
