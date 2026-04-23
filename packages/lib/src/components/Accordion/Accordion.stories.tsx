import type { Meta, StoryObj } from "@storybook/react-vite";
import Accordion from ".";

const meta = {
  title: "AI Generated/Complex/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  render: (args) => (
    <div style={{ width: 360 }}>
      <Accordion {...args} />
    </div>
  ),
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {
  args: {
    children: "Accordion content",
    subtitle: "Optional subtitle",
    title: "Build variants",
    toggledTitle: "Build variants expanded",
  },
};

export const InitiallyOpen: Story = {
  args: {
    children: "Expanded content is visible on first render.",
    defaultOpen: true,
    title: "Execution details",
  },
};
