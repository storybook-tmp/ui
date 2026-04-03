import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@leafygreen-ui/button";
import Popconfirm from ".";

const meta = {
  component: Popconfirm,
  args: {
    children: "Are you sure?",
  },
} satisfies Meta<typeof Popconfirm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popconfirm
      trigger={<Button>Delete Item</Button>}
      onConfirm={() => {}}
    >
      Are you sure you want to delete this item?
    </Popconfirm>
  ),
};

export const CustomConfirmText: Story = {
  render: () => (
    <Popconfirm
      trigger={<Button>Restart Task</Button>}
      confirmText="Restart"
      onConfirm={() => {}}
    >
      Are you sure you want to restart this task?
    </Popconfirm>
  ),
};

export const ConfirmDisabled: Story = {
  render: () => (
    <Popconfirm
      trigger={<Button>Submit</Button>}
      confirmText="Confirm"
      confirmDisabled
      onConfirm={() => {}}
    >
      This action cannot be confirmed right now.
    </Popconfirm>
  ),
};
