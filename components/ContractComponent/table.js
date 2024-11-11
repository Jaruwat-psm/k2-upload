import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { GetContractFile } from '../../api/getdata';

export default function DataTableContractComponent({ Data, page, pageSize, setPage, setPageSize, totalRecords, setSearch }) {
  const [paginationModel, setPaginationModel] = useState({
    page: page,
    pageSize: pageSize,
  });
  const [fileUrls, setFileUrls] = useState({}); // สำหรับเก็บ Blob URL

  const fetchBlobUrl = async (id) => {
    setFileUrls((prev) => ({ ...prev, [id]: 'loading' })); // ตั้งสถานะเป็นกำลังโหลด
    try {
      const url = await GetContractFile(id);
      setFileUrls((prev) => ({ ...prev, [id]: url })); // บันทึก Blob URL
    } catch (error) {
      console.error("Error fetching file:", error);
      setFileUrls((prev) => ({ ...prev, [id]: null })); // บันทึกว่าไม่มี URL ในกรณีเกิดข้อผิดพลาด
    }
  };

  const columns = [
    { field: 'Date', headerName: 'วันที่', width: 150, align: 'center', headerAlign: 'center' },
    { field: 'Number', headerName: 'เลขที่', width: 120, align: 'center', headerAlign: 'center' },
    { field: 'Title', headerName: 'เรื่อง', flex:1, align: 'start', headerAlign: 'start' },
    { field: 'Vendor', headerName: 'คู่สัญญา', width: 200, align: 'center', headerAlign: 'center' },
    { field: 'Owner', headerName: 'ผู้ขอ', width: 200, align: 'center', headerAlign: 'center' },
    { 
      field: 'File', 
      headerName: 'เอกสาร', 
      width: 160, 
      align: 'center', 
      headerAlign: 'center',
      renderCell: (params) => {
        const fileUrl = fileUrls[params.row.id];
        useEffect(() => {
          if (params.row.checkFile && !fileUrl) {
            fetchBlobUrl(params.row.id); // ดึงไฟล์เมื่อยังไม่มี Blob URL
          }
        }, [params.row.id, params.row.checkFile, fileUrl]);
        return (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
            {fileUrl === 'loading' ? (
              <CircularProgress size={10} />
            ) : fileUrl ? (
              <a href={fileUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FileOpenIcon sx={{ color: '#FF8A8A', fontSize: 30, ":hover": { cursor: 'pointer' } }} />
              </a>
            ) : (
              'ไม่พบเอกสาร'
            )}
          </Box>
        );
      }
    },
    { field: '', headerName: 'Action', width: 200, align: 'center', headerAlign: 'center' },
  ];

  const rows = Data?.data?.map((item, key) => ({
    id: item.ID || key + 1,
    Number: item.Number,
    Title: item.Subject,
    Vendor: item.Vendor,
    Date: item.Date,
    Owner: item.FIRSTNAME,
    checkFile: item.filename,
    Filename: item.guarantee + item.filename
  })) || [];

  const handleFilterChange = (filterModel) => {
    const searchValue = filterModel.quickFilterValues?.[0] || '';
    setSearch(searchValue); // ตั้งค่าการค้นหาใหม่
  };

  return (
    <Paper sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        rowHeight={60}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
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
        onFilterModelChange={handleFilterChange}
        disableRowSelectionOnClick
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
