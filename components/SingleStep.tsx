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
    <div className="flex h-full flex-col rounded-lg bg-urbancare-tertiary-blue p-6 sm:p-8">
      <div className="space-y-3">
        <Text
          className="text-4xl leading-none sm:text-5xl"
          weight="bold"
          size="p"
        >
          {number}
        </Text>
        <Text as="h3" weight="bold" size="h4">
          {title}
        </Text>
      </div>
      <Text size="p" className="mt-8 text-pretty">
        {description}
      </Text>
    </div>
  );
}
