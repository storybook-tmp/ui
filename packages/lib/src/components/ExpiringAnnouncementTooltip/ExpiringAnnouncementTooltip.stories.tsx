import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";
import { ExpiringAnnouncementTooltip } from ".";

const meta = {
  component: ExpiringAnnouncementTooltip,
  tags: ["ai-generated"],
} satisfies Meta<typeof ExpiringAnnouncementTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstView: Story = {
  args: {
    cookieName: "STORYBOOK_GUIDE_UNSEEN",
    title: "New filter controls",
    children: "Use the filter menu to narrow task results.",
  },
  play: async ({ canvasElement }) => {
    await waitFor(() => {
      expect(canvasElement.ownerDocument.body).toHaveTextContent(
        "New filter controls",
      );
    });
  },
};

export const SeenRecently: Story = {
  args: {
    cookieName: "STORYBOOK_GUIDE_SEEN",
    title: "Recent announcement",
    children: "This message opens only when requested.",
  },
  play: async ({ canvasElement, userEvent }) => {
    await expect(
      canvasElement.querySelector('[data-cy="announcement-tooltip-trigger"]'),
    ).toBeVisible();
    await expect(canvasElement.ownerDocument.body).not.toHaveTextContent(
      "Recent announcement",
    );
    await userEvent.click(
      canvasElement.querySelector(
        '[data-cy="announcement-tooltip-trigger"]',
      ) as HTMLElement,
    );
    await waitFor(() => {
      expect(canvasElement.ownerDocument.body).toHaveTextContent(
        "Recent announcement",
      );
    });
  },
};

export const Expired: Story = {
  args: {
    cookieName: "STORYBOOK_GUIDE_EXPIRED",
    title: "Expired announcement",
    children: "This announcement is past its active window.",
  },
  play: async ({ canvasElement }) => {
    await expect(
      canvasElement.querySelector('[data-cy="announcement-tooltip-trigger"]'),
    ).not.toBeInTheDocument();
    await expect(canvasElement.ownerDocument.body).not.toHaveTextContent(
      "Expired announcement",
    );
  },
};
