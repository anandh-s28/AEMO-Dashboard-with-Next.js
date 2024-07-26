import StateDemandChart from "@/components/Charts/Demand";

export default function Page() {
  return (
    <div>
      <h1 className="p-10 text-3xl font-medium tracking-tight">
        Electricity Generation in Australia
      </h1>
      <div className=" p-10">
        <StateDemandChart
          tableName="electricity_data_NSW1"
          title="Electricity Demand in NSW"
        />
        {/* <StateDemandChart
          tableName="electricity_data_VIC1"
          title="Electricity Demand in Victoria"
        />
        <StateDemandChart
          tableName="electricity_data_TAS1"
          title="Electricity Demand in Tasmania"
        />
        <StateDemandChart
          tableName="electricity_data_SA1"
          title="Electricity Demand in South Australia"
        />
        <StateDemandChart
          tableName="electricity_data_QLD1"
          title="Electricity Demand in Queensland"
        /> */}
      </div>
    </div>
  );
}
