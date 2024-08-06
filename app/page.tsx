import { Dashboard } from "@/components/Dashboard";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <div className="pl-10 pt-10 pr-10">
      <h1 className="text-4xl font-light tracking-tight mb-5">
        <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-500 bg-clip-text text-transparent">
          Electricity Generation
        </span>{" "}
        in Australia
      </h1>
      <p className="tracking-tight font-light mb-5">
        This is a simple dashboard app visualising energy generation data from
        the National Electricity Market (NEM)/AEMO in Australia. It provides
        real-time data on electricity generation sources, including coal, gas,
        wind, solar, and hydro. Users can explore the data through interactive
        charts and graphs, allowing them to gain insights into the energy
        landscape in Australia.
      </p>
      <div>
        <Dashboard />
      </div>
    </div>
  );
}
