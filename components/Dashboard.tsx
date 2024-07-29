"use client";
import React, { useState } from "react";
import { ChartSelection } from "./ChartSelection";
import StateDemandChart from "./Charts/Demand";
import StateRRPChart from "./Charts/RRPChart";

// Define the type for the state configuration
interface StateConfig {
  titleDemand: string;
  titleRRP: string;
  color: string;
}

// Define the type for the state configuration object
const stateConfig: Record<string, StateConfig> = {
  electricity_data_NSW1: {
    titleDemand: "Electricity Demand in NSW",
    titleRRP: "Electricity Price in NSW",
    color: "hsl(var(--chart-1))",
  },
  electricity_data_VIC1: {
    titleDemand: "Electricity Demand in Victoria",
    titleRRP: "Electricity Price in Victoria",
    color: "hsl(var(--chart-2))",
  },
  electricity_data_TAS1: {
    titleDemand: "Electricity Demand in Tasmania",
    titleRRP: "Electricity Price in Tasmania",
    color: "hsl(var(--chart-3))",
  },
  electricity_data_SA1: {
    titleDemand: "Electricity Demand in South Australia",
    titleRRP: "Electricity Price in South Australia",
    color: "hsl(var(--chart-4))",
  },
  electricity_data_QLD1: {
    titleDemand: "Electricity Demand in Queensland",
    titleRRP: "Electricity Price in Queensland",
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
            title={stateConfig[selectedState].titleDemand}
            color={stateConfig[selectedState].color}
          />
          <StateRRPChart
            tableName={selectedState}
            title={stateConfig[selectedState].titleRRP}
            color={stateConfig[selectedState].color}
          />
        </div>
      )}
    </div>
  );
}
