import StateDemandChart from "@/components/Charts/Demand";

export default function Page() {
  return (
    <div>
      <h1 className="p-10 text-4xl font-light tracking-tight">
        Electricity Generation in Australia
      </h1>
      <div className="grid grid-cols-3 gap-5 pl-10 pr-10">
        <StateDemandChart
          tableName="electricity_data_NSW1"
          title="New South Wales"
          color="hsl(var(--chart-1))"
        />
        <StateDemandChart
          tableName="electricity_data_VIC1"
          title="Victoria"
          color="hsl(var(--chart-4))"
        />
        <StateDemandChart
          tableName="electricity_data_TAS1"
          title="Tasmania"
          color="hsl(var(--chart-2))"
        />
        <StateDemandChart
          tableName="electricity_data_SA1"
          title="South Australia"
          color="hsl(var(--chart-3))"
        />
        <StateDemandChart
          tableName="electricity_data_QLD1"
          title="Queensland"
          color="hsl(var(--chart-5))"
        />
      </div>
    </div>
  );
}
