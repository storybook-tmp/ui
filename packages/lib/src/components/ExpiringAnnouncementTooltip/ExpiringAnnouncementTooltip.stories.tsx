import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { ExpiringAnnouncementTooltip } from ".";

const meta = {
  component: ExpiringAnnouncementTooltip,
  tags: ["ai-generated"],
} satisfies Meta<typeof ExpiringAnnouncementTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstView: Story = {
  args: {
    children: "Try out the new task history filters.",
    cookieName: "storybook-announcement-first-view",
    title: "New Release",
  },
  play: async ({ canvasElement }) => {
    const page = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(page.getByText("New Release")).toBeVisible();
    });
    await expect(
      page.getByText("Try out the new task history filters."),
    ).toBeVisible();
  },
};

export const ReopensFromIcon: Story = {
  args: {
    children: "The announcement remains available from the info icon.",
    cookieName: "storybook-announcement-reopens",
    title: "Task History",
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    const page = within(canvasElement.ownerDocument.body);
    await waitFor(() => {
      expect(page.getByText("Task History")).toBeVisible();
    });

    await userEvent.click(canvas.getByLabelText("Info With Circle Icon"));
    await waitFor(() => {
      expect(page.queryByText("Task History")).not.toBeVisible();
    });

    await userEvent.click(canvas.getByLabelText("Info With Circle Icon"));
    await waitFor(() => {
      expect(page.getByText("Task History")).toBeVisible();
    });
  },
};

export const Loading: Story = {
  args: {
    children: "This should not render while loading.",
    cookieName: "storybook-announcement-loading",
    loading: true,
    title: "Loading Announcement",
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.queryByLabelText("Info With Circle Icon"),
    ).not.toBeInTheDocument();
  },
};
