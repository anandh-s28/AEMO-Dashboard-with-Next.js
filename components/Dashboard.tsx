"use client";
import React, { useState } from "react";
import { ChartSelection } from "./ChartSelection";
import StateDemandChart from "./Charts/Demand";
import StateRRPChart from "./Charts/RRPChart";
import DemandPriceSummaryCard from "./Summary Cards/DemandRRPSummary";

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
      <h1 className="mb-2 text-2xl tracking-tight">Price and Demand</h1>
      <ChartSelection onSelect={handleStateSelect} />
      {selectedState === null && (
        <div className="mt-5">Please select a state to view data</div>
      )}
      {selectedState && stateConfig[selectedState] && (
        <div>
          <div>
            <DemandPriceSummaryCard tableName={selectedState} />
          </div>
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
        </div>
      )}
    </div>
  );
}
