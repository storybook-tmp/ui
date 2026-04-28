import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { FullPageLoad } from "./index";

const meta: Meta<typeof FullPageLoad> = {
  component: FullPageLoad,
  tags: ["ai-generated"],
};

export default meta;
type Story = StoryObj<typeof FullPageLoad>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("LOADING...")).toBeVisible();
  },
};
