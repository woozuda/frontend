"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export interface ChartData {
  emotion: string;
  value: number;
  fill?: string;
}

export interface ChartProps {
  data: ChartData[];
}

const chartConfig = {} satisfies ChartConfig;

export default function Chart(props: ChartProps) {
  const { data } = props;

  return (
    <Card className="flex flex-col bg-transparent border-none w-full min-w-[120px]">
      <CardHeader className="items-center h-0 overflow-hidden p-0"></CardHeader>
      <CardContent className="flex-1 pb-0 p-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="emotion"
              innerRadius={40}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm h-0 overflow-hidden p-0"></CardFooter>
    </Card>
  );
}
