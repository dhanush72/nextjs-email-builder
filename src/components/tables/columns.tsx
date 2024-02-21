'use client';

import { Email, Folder } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { format, formatDistance } from 'date-fns';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import CellAction from './cell-action';

type FolderWithEmails = Folder & { emails: Email[] };

export const columns: ColumnDef<FolderWithEmails>[] = [
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <Link
        href={`/dashboard/folder/${row.original.id}`}
        className="block w-fit text-left hover:underline"
      >
        <div className="flex items-center space-x-2">
          <p>{row.original.name}</p>
          <ExternalLink size={16} className="text-muted-foreground" />
        </div>
      </Link>
    ),
  },
  {
    accessorKey: 'emails',
    header: 'Emails',
    cell: ({ row }) => <div>{row.original.emails?.length}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => (
      <div>{format(new Date(row.original.createdAt), 'dd MMMM yyyy')}</div>
    ),
  },
  {
    accessorKey: 'updatedAt',
    header: 'Edited',
    cell: ({ row }) => (
      <div>{formatDistance(row.original.updatedAt, new Date())}</div>
    ),
  },
  {
    accessorKey: 'actions',
    header: 'Action',
    cell: ({ row }) => <CellAction folder={row.original} />,
  },
];
