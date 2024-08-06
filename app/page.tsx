import { Dashboard } from "@/components/Dashboard";

export default function Page() {
  return (
    <div className="pl-10 pt-10 pr-10">
      <h1 className="text-4xl font-light tracking-tight mb-5">
        Electricity Generation in Australia
      </h1>
      <p className="tracking-tight mb-5">
        This is a simple dashboard app visualising energy generation data from
        the National Electricity Market (NEM) in Australia.
      </p>
      <div>
        <Dashboard />
      </div>
    </div>
  );
}
