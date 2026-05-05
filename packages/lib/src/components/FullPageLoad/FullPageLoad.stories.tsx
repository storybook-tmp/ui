import type { Meta, StoryObj } from "@storybook/react-vite";
import { FullPageLoad } from ".";

const meta = {
  title: "AI Generated/Simple/FullPageLoad",
  component: FullPageLoad,
} satisfies Meta<typeof FullPageLoad>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InContainer: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 400, height: 300, border: "1px solid #ccc", position: "relative", overflow: "hidden" }}>
        <Story />
      </div>
    ),
  ],
};
