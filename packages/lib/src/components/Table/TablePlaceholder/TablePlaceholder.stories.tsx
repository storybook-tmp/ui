import type { Meta, StoryObj } from "@storybook/react-vite";
import { TablePlaceholder } from ".";

const meta = {
  component: TablePlaceholder,
  args: {
    message: "No results found.",
  },
} satisfies Meta<typeof TablePlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <TablePlaceholder message="No results found." />,
};

export const WithCustomGlyph: Story = {
  render: () => (
    <TablePlaceholder message="No tasks match this filter." glyph="Warning" />
  ),
};

export const Loading: Story = {
  render: () => (
    <TablePlaceholder
      message="Loading results..."
      glyph="Refresh"
      spin
    />
  ),
};
