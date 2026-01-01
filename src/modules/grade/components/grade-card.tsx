import React from "react";
import { PcCase } from 'lucide-react'
import type {IGrade} from "@/modules/grade/lib/types.ts";
import {Card, CardHeader, CardTitle} from "@/components/ui/card";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  grade: IGrade;
}

function GradeCard({grade, ...props}: Props) {
  return (
    <Card variant={"action"} {...props}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-5">
            <PcCase/>
            <CardTitle className="text-lg">{grade.name}</CardTitle>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default GradeCard;