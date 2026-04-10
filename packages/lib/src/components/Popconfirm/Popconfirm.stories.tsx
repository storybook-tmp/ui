import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import Popconfirm from ".";

const meta = {
  args: {
    children: "Confirm action",
  },
  component: Popconfirm,
  title: "Components/Popconfirm",
} satisfies Meta<typeof Popconfirm>;

export default meta;

type Story = StoryObj<typeof meta>;

const ControlledPopconfirm: React.FC<{
  confirmDisabled?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
}> = ({ confirmDisabled = false, onClose, onConfirm }) => {
  const [open, setOpen] = useState(true);

  return (
    <Popconfirm
      confirmDisabled={confirmDisabled}
      onClose={() => {
        onClose?.();
        setOpen(false);
      }}
      onConfirm={() => {
        onConfirm?.();
        setOpen(false);
      }}
      open={open}
      setOpen={setOpen}
    >
      Delete this patch?
    </Popconfirm>
  );
};

const TriggeredPopconfirm: React.FC = () => {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <>
      {confirmed && <div>Patch deleted</div>}
      <Popconfirm
        onConfirm={() => {
          setConfirmed(true);
        }}
        trigger={<span>Open confirmation</span>}
      >
        This action cannot be undone.
      </Popconfirm>
    </>
  );
};

export const Open: Story = {
  play: async ({ canvasElement, mount }) => {
    const canvas = await mount(<ControlledPopconfirm />);
    const body = within(canvasElement.ownerDocument.body);

    await expect(await body.findByRole("button", { name: "Yes" })).toBeInTheDocument();
    await expect(
      await body.findByRole("button", { name: "Cancel" }),
    ).toBeInTheDocument();
  },
};

export const ConfirmDisabled: Story = {
  play: async ({ canvasElement, mount }) => {
    const canvas = await mount(<ControlledPopconfirm confirmDisabled />);
    const body = within(canvasElement.ownerDocument.body);

    await expect(await body.findByRole("button", { name: "Yes" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  },
};

export const Triggered: Story = {
  play: async ({ canvasElement, mount, userEvent }) => {
    const canvas = await mount(<TriggeredPopconfirm />);
    const body = within(canvasElement.ownerDocument.body);

    await userEvent.click(await canvas.findByText("Open confirmation"));
    await expect(await body.findByRole("button", { name: "Yes" })).toBeInTheDocument();
    await userEvent.click(await body.findByRole("button", { name: "Yes" }));
    await expect(await canvas.findByText("Patch deleted")).toBeVisible();
  },
};
