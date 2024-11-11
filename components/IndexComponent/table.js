import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

export default function DataTableIndexComponent({ Data, page, pageSize, setPage, setPageSize, totalRecords }) {
  const [paginationModel, setPaginationModel] = React.useState({
    page: page,
    pageSize: pageSize,
  });
  const columns = [
    { field: 'Date', headerName: 'วันที่', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'Number', headerName: 'เลขที่', width: 120, align: 'center', headerAlign: 'center' },
    { field: 'Title', headerName: 'เรื่อง', width: 400, align: 'start', headerAlign: 'start' },
    { field: 'Approval', headerName: 'ผู้อนุมัติ', width: 160, align: 'center', headerAlign: 'center' },
    { field: 'budget', headerName: 'งบประมาณ', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'Owner', headerName: 'ผู้ขอ', width: 160, align: 'center', headerAlign: 'center' },
    { field: 'Status', headerName: 'สถานะ', width: 100, align: 'center', headerAlign: 'center' },
    { field: 'Remark', headerName: 'รายละเอียด', width: 170, align: 'center', headerAlign: 'center' },
    { field: '', headerName: 'Action', width: 200, align: 'center', headerAlign: 'center' },
  ];

  const rows = Data?.data?.map((item, key) => ({
    id: item.ID || key + 1,
    Number: item.Number,
    Title: item.Title,
    Approval: item.Approve,
    Date: item.Date,
    Remark: item.Remark,
    Owner: item.Owner,
    Budget: item.budget,
    Requester: item.Requester,
    Status: item.Status,
  })) || [];

  return (
    <Paper sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: paginationModel.page, pageSize: paginationModel.pageSize },
          },
        }}
        pagination
        paginationMode="server"
        pageSizeOptions={[10, 50, 100]}
        pageSize={pageSize}
        page={page}
        rowCount={totalRecords}
        onPaginationModelChange={(model) => {
          setPage(model.page);
          setPageSize(model.pageSize);
        }}
        disableRowSelectionOnClick
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
