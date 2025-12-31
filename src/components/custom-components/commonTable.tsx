"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { SquareChevronLeft, SquareChevronRight } from "lucide-react";
import CommonButton from "./commonButton";

/* ---------------- TYPES ---------------- */

export type ColumnType = {
  title: string;
  dataIndex: string;
  sorter?: boolean;
  render?: (value: any, row: any) => React.ReactNode;
};

type CommonTableProps = {
  columns: ColumnType[];
  data: Record<string, any>[];
  pagePagination: number;
  totalPagesPagination: number;
  onPageChangePagination: (page: number) => void;
};

type PaginationProps = {
  pagePagination: number;
  totalPagesPagination: number;
  onPageChangePagination: (page: number) => void;
};

/* ---------------- VALUE RENDERER ---------------- */

const renderCellValue = (value: any) => {
  if (value === null || value === undefined) return "-";

  if (typeof value === "boolean") return value ? "Yes" : "No";

  if (typeof value === "string" && !isNaN(Date.parse(value))) {
    return new Date(value).toLocaleDateString();
  }

  if (Array.isArray(value)) return value.length ? value.join(", ") : "-";

  if (typeof value === "object") return JSON.stringify(value);

  return value;
};

/* ---------------- PAGINATION ---------------- */

export function TablePagination({
  pagePagination,
  totalPagesPagination,
  onPageChangePagination,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-end gap-4 py-3">
      <CommonButton
        variant="light"
        size="sm"
        disabled={pagePagination === 1}
        onClick={() => onPageChangePagination(pagePagination - 1)}
      >
        <SquareChevronLeft className="!w-5 !h-5" />
      </CommonButton>

      <span className="text-sm text-muted-foreground">
        Page {pagePagination} of {totalPagesPagination}
      </span>

      <CommonButton
        variant="light"
        size="sm"
        disabled={pagePagination === totalPagesPagination}
        onClick={() => onPageChangePagination(pagePagination + 1)}
      >
        <SquareChevronRight className="!w-5 !h-5" />
      </CommonButton>
    </div>
  );
}

/* ---------------- TABLE ---------------- */

export function CommonTable({
  columns,
  data,
  pagePagination,
  totalPagesPagination,
  onPageChangePagination,
}: CommonTableProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollable, setScrollable] = useState(false);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(false);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const isScrollable = scrollWidth > clientWidth;

    setScrollable(isScrollable);
    if (!isScrollable)
      return setShowLeftShadow(false), setShowRightShadow(false);

    setShowLeftShadow(scrollLeft > 4);
    setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 4);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, []);

  return (
    <div className="relative w-full">
      {/* Scroll Area */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="overflow-x-auto"
      >
        {/* Table */}
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col, index) => (
                <th
                  key={index}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No records found
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-6 py-4 whitespace-nowrap text-sm"
                    >
                      {column.render
                        ? column.render(row[column.dataIndex], row)
                        : renderCellValue(row[column.dataIndex])}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="border-t px-4">
        <TablePagination
          pagePagination={pagePagination}
          totalPagesPagination={totalPagesPagination}
          onPageChangePagination={onPageChangePagination}
        />
      </div>
    </div>
  );
}
