import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { TablePlaceholder } from "./index";

const meta = {
  component: TablePlaceholder,
  tags: ["ai-generated"],
} satisfies Meta<typeof TablePlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: "No results found",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("No results found")).toBeVisible();
  },
};

export const WithSpinner: Story = {
  args: {
    message: "Loading data...",
    spin: true,
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Loading data...")).toBeVisible();
  },
};

export const CustomMessage: Story = {
  args: {
    message: (
      <span>
        No tasks match the current filters. Try adjusting your search criteria.
      </span>
    ),
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByText(/no tasks match the current filters/i),
    ).toBeVisible();
  },
};
