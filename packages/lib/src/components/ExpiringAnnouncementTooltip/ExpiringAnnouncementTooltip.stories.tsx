import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { ExpiringAnnouncementTooltip } from ".";

const meta = {
  component: ExpiringAnnouncementTooltip,
  args: {
    children: "Review failing tasks directly from the version page.",
    title: "Task review is available",
    tooltipAlign: "top",
  },
} satisfies Meta<typeof ExpiringAnnouncementTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstView: Story = {
  args: {
    cookieName: "STORYBOOK_NEW_FEATURE",
  },
  play: async ({ canvasElement }) => {
    const body = within(canvasElement.ownerDocument.body);

    await waitFor(() => {
      expect(body.getByText("Task review is available")).toBeVisible();
    });
    await expect(
      body.getByText("Review failing tasks directly from the version page."),
    ).toBeVisible();
  },
};

export const SeenRecently: Story = {
  args: {
    cookieName: "STORYBOOK_SEEN_FEATURE",
  },
  play: async ({ canvasElement, userEvent }) => {
    const body = within(canvasElement.ownerDocument.body);
    const trigger = canvasElement.querySelector(
      '[data-cy="announcement-tooltip-trigger"]',
    );

    await expect(trigger).toBeVisible();
    await expect(body.queryByText("Task review is available")).toBeNull();

    await userEvent.click(trigger as Element);

    await waitFor(() => {
      expect(body.getByText("Task review is available")).toBeVisible();
    });
  },
};

export const Expired: Story = {
  args: {
    cookieName: "STORYBOOK_EXPIRED_FEATURE",
  },
  play: async ({ canvasElement }) => {
    await expect(
      canvasElement.querySelector('[data-cy="announcement-tooltip-trigger"]'),
    ).toBeNull();
  },
};
