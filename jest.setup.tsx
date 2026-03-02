// jest.setup.tsx
import React from "react";

// ✅ Mock Chart.js React bindings globally
jest.mock("react-chartjs-2", () => ({
  Line: (props: any) => {
    const label = props?.data?.datasets?.[0]?.label || "Line Chart";
    return <canvas role="img" aria-label={label} />;
  },
  Bar: (props: any) => {
    const label = props?.data?.datasets?.[0]?.label || "Bar Chart";
    return <canvas role="img" aria-label={label} />;
  },
}));

// ✅ Extend Jest with React Native Testing Library matchers
import "@testing-library/jest-native/extend-expect";