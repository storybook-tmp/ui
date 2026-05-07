import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { ExpiringAnnouncementTooltip } from ".";

const meta = {
  component: ExpiringAnnouncementTooltip,
  tags: ["ai-generated"],
  args: {
    activeDays: 8,
    children: "The task history view now includes failing command output.",
    cookieName: "storybook-release-tooltip",
    title: "Task history update",
  },
} satisfies Meta<typeof ExpiringAnnouncementTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NeverSeen: Story = {
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(body.getByText("Task history update")).toBeVisible();
    });
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const BottomAligned: Story = {
  args: {
    cookieName: "storybook-release-tooltip-bottom",
    tooltipAlign: "bottom",
  },
};
