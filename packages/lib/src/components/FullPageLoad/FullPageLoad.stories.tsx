import type { Meta, StoryObj } from "@storybook/react-vite";
import { FullPageLoad } from ".";

const meta = {
  component: FullPageLoad,
} satisfies Meta<typeof FullPageLoad>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <FullPageLoad />,
};
