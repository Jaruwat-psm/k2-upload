import React, { useState, useEffect } from "react";
import LayoutComponent from "../Layout";
import DataTableIndexComponent from "./table";
import CardIndexComponent from "./card-doc";
import Head from "next/head";
import { GetAorVor } from "../../api/getdata";
import { Box, Typography } from "@mui/material";

export default function IndexComponent() {
  const [Data, setData] = useState([]);
  const [id, setID] = useState(3);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const fetchData = async (id, page, pageSize) => {
    const response = await GetAorVor(id, page * pageSize, pageSize);
    setData(response);
  };

  useEffect(() => {
    fetchData(id, page, pageSize);
    const departnumber = localStorage.getItem('departnumber');
    if (departnumber) {
      setID(departnumber);
    } else {
      setID(3); // เริ่มต้นให้อยู่ในหน้า��ลัก
    }
  }, [id, page, pageSize]);

  return (
    <LayoutComponent>
      <Head>
        <title>PSM - Documentation</title>
        <meta property="og:title" content="PSM - Documentation" key="title" />
      </Head>
      <Box sx={{ display: 'flex' }}>
        <Typography variant="h5" color="initial">อว 67.16/({id})</Typography>
      </Box>
      <DataTableIndexComponent
        Data={Data}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        totalRecords={Data?.recordsTotal || 0}
      />
    </LayoutComponent>
  );
}
