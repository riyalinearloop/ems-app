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
    <div className="relative w-full border rounded-lg overflow-hidden">
      {/* Scroll Area */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className={`relative ${
          scrollable ? "overflow-x-auto" : "overflow-hidden"
        }`}
      >
        {/* Shadows */}
        {scrollable && showLeftShadow && (
          <div className="absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-black/20 to-transparent z-10" />
        )}
        {scrollable && showRightShadow && (
          <div className="absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-black/20 to-transparent z-10" />
        )}

        {/* Table */}
        <Table className="min-w-[900px]">
          <TableHeader>
            <TableRow>
              {columns.map((col, index) => (
                <TableHead key={index}>{col.title}</TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-6"
                >
                  No records found
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex}>
                      {column.render
                        ? column.render(row[column.dataIndex], row)
                        : renderCellValue(row[column.dataIndex])}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
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
