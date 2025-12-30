"use client";

import CountUp from "./react-bits/CountUp";
import { Text } from "./Text";

interface SingleStatProps {
  title: string;
  emoji: string;
  number: number;
  rightText?: string;
}

export default function SingleStat({
  title,
  emoji,
  number,
  rightText,
}: SingleStatProps) {
  return (
    <div className="text-white text-center flex flex-col gap-0">
      <div className="text-4xl mb-2">{emoji}</div>
      <div className="text-3xl font-bold  flex items-center justify-center">
        <CountUp
          className="text-6xl! tracking-wide font-poppins text-urbancare-tertiary-blue font-semibold"
          to={number}
          duration={1.5}
        />

        {rightText && (
          <Text className=" text-6xl! font-poppins text-urbancare-tertiary-blue font-semibold leading-0">
            {rightText}
          </Text>
        )}
      </div>
      <Text size="p" className="text-white">
        {title}
      </Text>
    </div>
  );
}
