import type { Meta, StoryObj } from "@storybook/react";
import SentimentGauge from "./SentimentGauge";

const meta: Meta<typeof SentimentGauge> = {
  title: "Components/SentimentGauge",
  component: SentimentGauge,
  argTypes: {
    percent: {
      control: { type: "range", min: 0, max: 1, step: 0.05 },
    },
    label: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SentimentGauge>;

export const Playground: Story = {
  args: {
    percent: 0.5,
    label: "Sentiment",
  },
};

export const Low: Story = {
  args: {
    percent: 0.25,
    label: "Low Sentiment",
  },
};

export const Mid: Story = {
  args: {
    percent: 0.5,
    label: "Neutral Sentiment",
  },
};

export const High: Story = {
  args: {
    percent: 0.9,
    label: "High Sentiment",
  },
};