"use client";
import React, { useState } from "react";
import { ChartSelection } from "./ChartSelection";
import StateDemandChart from "./Charts/Demand";

// Define the type for the state configuration
interface StateConfig {
  title: string;
  color: string;
}

// Define the type for the state configuration object
const stateConfig: Record<string, StateConfig> = {
  electricity_data_NSW1: {
    title: "NSW Demand and Price",
    color: "hsl(var(--chart-1))",
  },
  electricity_data_VIC1: {
    title: "VIC Demand and Price",
    color: "hsl(var(--chart-2))",
  },
  electricity_data_TAS1: {
    title: "TAS Demand and Price",
    color: "hsl(var(--chart-3))",
  },
  electricity_data_SA1: {
    title: "SA Demand and Price",
    color: "hsl(var(--chart-4))",
  },
  electricity_data_QLD1: {
    title: "QLD Demand and Price",
    color: "hsl(var(--chart-5))",
  },
};

export function Dashboard() {
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const handleStateSelect = (value: string) => {
    setSelectedState(value);
  };

  return (
    <div>
      <ChartSelection onSelect={handleStateSelect} />
      {selectedState && stateConfig[selectedState] && (
        <div className="grid grid-cols-2 mt-5 gap-5">
          <StateDemandChart
            tableName={selectedState}
            title={stateConfig[selectedState].title}
            color={stateConfig[selectedState].color}
          />
        </div>
      )}
    </div>
  );
}
