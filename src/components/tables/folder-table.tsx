'use client';

import { Folder } from '@prisma/client';
import { DataTable } from '../ui/data-table';
import { columns } from './columns';

interface FolderTableProps {
  folders: Folder[];
}

const FolderTable = ({ folders }: FolderTableProps) => {
  return (
    <DataTable searchKey="name" columns={columns} data={folders}></DataTable>
  );
};

export default FolderTable;
