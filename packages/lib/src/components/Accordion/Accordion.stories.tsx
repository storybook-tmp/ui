import type { Meta, StoryObj } from "@storybook/react-vite";
import Accordion from ".";

const meta = {
  title: "AI Generated/Complex/Accordion",
  component: Accordion,
  args: {
    children:
      "Evergreen can collapse or expand this content while preserving the header state.",
    title: "Task details",
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Collapsed: Story = {};

export const ExpandedWithSubtitle: Story = {
  args: {
    defaultOpen: true,
    subtitle: "Opened by default for long-form details",
    toggledTitle: "Task details expanded",
  },
};
