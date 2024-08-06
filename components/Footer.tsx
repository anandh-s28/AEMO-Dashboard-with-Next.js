import React from "react";

const Footer: React.FC = () => {
  return (
    <footer>
      <p className="pl-5 justify-center bg-neutral-900 text-sm pt-4 pb-5">
        Data source: {""}
        <a
          href="https://aemo.com.au/energy-systems/electricity/national-electricity-market-nem/data-nem/data-dashboard-nem"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          Australian Energy Market Operator (AEMO) - National Electricity Market
          (NEM)
        </a>
      </p>
    </footer>
  );
};

export default Footer;
