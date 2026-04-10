import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import Accordion from ".";

const meta = {
  args: {
    children: "Accordion content",
    title: "Accordion title",
  },
  component: Accordion,
  title: "Components/Accordion",
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

const ControlledAccordion: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <Accordion
      onToggle={({ isVisible }) => setOpen(isVisible)}
      open={open}
      title="Build variants"
      toggledTitle="Build variants"
    >
      Toggle this section to review every build variant in the patch.
    </Accordion>
  );
};

export const Default: Story = {
  play: async ({ mount, userEvent }) => {
    const canvas = await mount(
      <Accordion
        subtitle="Patch details"
        title="Execution details"
        toggledTitle="Execution details"
      >
        Review the current execution plan before dispatching a new patch.
      </Accordion>,
    );

    await expect(await canvas.findByText("Execution details")).toBeVisible();
    await expect(await canvas.findByText("Patch details")).toBeVisible();
    await userEvent.click(await canvas.findByText("Execution details"));
    await expect(
      await canvas.findByText(
        "Review the current execution plan before dispatching a new patch.",
      ),
    ).toBeVisible();
  },
};

export const DefaultOpen: Story = {
  play: async ({ mount }) => {
    const canvas = await mount(
      <Accordion defaultOpen title="Recent tasks" toggledTitle="Recent tasks">
        Most recent tasks are expanded by default so you can scan failures quickly.
      </Accordion>,
    );

    await expect(await canvas.findByText("Recent tasks")).toBeVisible();
    await expect(
      await canvas.findByText(
        "Most recent tasks are expanded by default so you can scan failures quickly.",
      ),
    ).toBeVisible();
  },
};

export const Controlled: Story = {
  play: async ({ canvasElement, mount, userEvent }) => {
    const canvas = await mount(<ControlledAccordion />);
    const collapseContainer = canvasElement.querySelector(
      '[data-cy="accordion-collapse-container"]',
    );

    await expect(
      await canvas.findByText(
        "Toggle this section to review every build variant in the patch.",
      ),
    ).toBeVisible();
    await expect(collapseContainer).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(await canvas.findByText("Build variants"));
    await expect(collapseContainer).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(await canvas.findByText("Build variants"));
    await expect(collapseContainer).toHaveAttribute("aria-expanded", "true");
  },
};
