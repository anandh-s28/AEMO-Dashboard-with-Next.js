import StateDemandChart from "@/components/Charts/Demand";
import { ChartSelection } from "@/components/ChartSelection";
import { Dashboard } from "@/components/Dashboard";

export default function Page() {
  return (
    <div>
      <h1 className="pl-10 pt-10 pr-10 text-4xl font-light tracking-tight">
        Electricity Generation in Australia
      </h1>
      <div className="p-10">
        <Dashboard />
      </div>
    </div>
  );
}
