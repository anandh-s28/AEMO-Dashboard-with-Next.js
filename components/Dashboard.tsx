"use client";
import React, { useState } from "react";
import { ChartSelection } from "./ChartSelection";
import StateDemandChart from "./Charts/Demand";
import StateRRPChart from "./Charts/RRPChart";
import DemandPriceSummaryCard from "./Summary Cards/DemandRRPSummary";
import { FuelSupplyBarChart } from "./Charts/FuelType";
import { NEMRadial } from "./Charts/Nationwide";

interface StateConfig {
  state: string;
  titleDemand: string;
  titleRRP: string;
  color: string;
}

const stateConfig: Record<string, StateConfig> = {
  electricity_data_NSW1: {
    state: "NSW1",
    titleDemand: "Demand in NSW",
    titleRRP: "Price in NSW",
    color: "hsl(var(--chart-1))",
  },
  electricity_data_VIC1: {
    state: "VIC1",
    titleDemand: "Demand in Victoria",
    titleRRP: "Price in Victoria",
    color: "hsl(var(--chart-2))",
  },
  electricity_data_TAS1: {
    state: "TAS1",
    titleDemand: "Demand in Tasmania",
    titleRRP: "Price in Tasmania",
    color: "hsl(var(--chart-3))",
  },
  electricity_data_SA1: {
    state: "SA1",
    titleDemand: "Demand in South Australia",
    titleRRP: "Price in South Australia",
    color: "hsl(var(--chart-4))",
  },
  electricity_data_QLD1: {
    state: "QLD1",
    titleDemand: "Demand in Queensland",
    titleRRP: "Price in Queensland",
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
      <h1 className="text-xl">Renewable vs Non-Renewable</h1>
      <NEMRadial />
      <h1 className="mb-2 text-2xl tracking-tight">Price and Demand</h1>
      <ChartSelection onSelect={handleStateSelect} />
      {!selectedState && (
        <p className="pt-2 text-sm">Select a state to view data</p>
      )}
      {selectedState && stateConfig[selectedState] && (
        <div>
          <div>
            <DemandPriceSummaryCard tableName={selectedState} />
          </div>
          <div className="grid grid-cols-3 mt-5 gap-5">
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
            <FuelSupplyBarChart state={stateConfig[selectedState].state} />
          </div>
        </div>
      )}
    </div>
  );
}
