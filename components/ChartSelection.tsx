import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ChartSelectionProps {
  onSelect: (value: string) => void;
}

export function ChartSelection({ onSelect }: ChartSelectionProps) {
  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select state" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="electricity_data_NSW1">New South Wales</SelectItem>
          <SelectItem value="electricity_data_VIC1">Victoria</SelectItem>
          <SelectItem value="electricity_data_TAS1">Tasmania</SelectItem>
          <SelectItem value="electricity_data_SA1">South Australia</SelectItem>
          <SelectItem value="electricity_data_QLD1">Queensland</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
