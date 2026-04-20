import { useMemo } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import TestStatusBadge from "../Badge/TestStatusBadge";
import {
  BaseTable,
  LGColumnDef,
  TablePlaceholder,
  useLeafyGreenTable,
} from ".";

interface TestResult {
  duration: string;
  status: string;
  testFile: string;
}

const testResults: TestResult[] = [
  {
    duration: "12s",
    status: "pass",
    testFile: "auth_test.js",
  },
  {
    duration: "48s",
    status: "fail",
    testFile: "replication_test.js",
  },
];

const TestResultsTable = ({
  loading = false,
  rows,
}: {
  loading?: boolean;
  rows: TestResult[];
}) => {
  const columns = useMemo<LGColumnDef<TestResult>[]>(() => getColumns(), []);
  const table = useLeafyGreenTable<TestResult>({
    columns,
    data: rows,
  });

  return (
    <BaseTable
      emptyComponent={
        <TablePlaceholder message="No logs found for this job." />
      }
      loading={loading}
      loadingRows={3}
      shouldAlternateRowColor
      table={table}
    />
  );
};

const meta = {
  component: TestResultsTable,
  args: {
    rows: testResults,
  },
} satisfies Meta<typeof TestResultsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithRows: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Test Name")).toBeVisible();
    await expect(canvas.getByText("auth_test.js")).toBeVisible();
    await expect(canvas.getByText("replication_test.js")).toBeVisible();
    await expect(canvas.getByText("Pass")).toBeVisible();
    await expect(canvas.getByText("Fail")).toBeVisible();
  },
};

export const Empty: Story = {
  args: {
    rows: [],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("No logs found for this job.")).toBeVisible();
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    rows: [],
  },
  play: async ({ canvas, canvasElement }) => {
    const loadingRows = canvasElement.querySelectorAll(
      '[data-cy="table-loader-loading-row"]',
    );

    await expect(canvas.getByText("Test Name")).toBeVisible();
    await expect(loadingRows).toHaveLength(3);
  },
};

const getColumns = (): LGColumnDef<TestResult>[] => [
  {
    header: "Test Name",
    accessorKey: "testFile",
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ getValue }) => <TestStatusBadge status={getValue() as string} />,
    enableColumnFilter: false,
    enableSorting: false,
  },
  {
    header: "Duration",
    accessorKey: "duration",
    enableColumnFilter: false,
    enableSorting: false,
  },
];
