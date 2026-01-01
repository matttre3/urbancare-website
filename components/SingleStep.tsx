import React from "react";
import { Text } from "./Text";

interface SingleStepProps {
  number: string;
  title: string;
  description: string;
}

export default function SingleStep({
  number,
  title,
  description,
}: SingleStepProps) {
  return (
    <div className="h-full flex justify-between flex-col rounded-lg bg-urbancare-tertiary-blue  p-8">
      <div>
        <Text className="text-5xl " weight="bold" size="p">
          {number}
        </Text>
        <Text weight="bold" size="h4">
          {title}
        </Text>
      </div>
      <Text size="p" className="mt-16">
        {description}
      </Text>
    </div>
  );
}
