import React, { useState, useEffect } from "react";
import LayoutComponent from "../Layout";
import DataTableContractComponent from "./table";
import Head from "next/head";
import { GetContract } from "../../api/getdata";
import { Box, Typography } from "@mui/material";

export default function ContractComponent() {
  const [Data, setData] = useState([]);
  const [id, setID] = useState(3);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const fetchData = async (id, page, pageSize, search) => {
    const response = await GetContract(id, page * pageSize, pageSize, search);
    setData(response);
  };

  useEffect(() => {
    fetchData(id, page, pageSize, search);
  }, [id, page, pageSize, search]);

  return (
    <LayoutComponent>
      <Head>
        <title>PSM - Contract</title>
        <meta property="og:title" content="PSM - Contract" key="title" />
      </Head>
      <Box sx={{ display: 'flex' }}>
        <Typography variant="h5" color="initial">เอกสารสัญญา</Typography>
      </Box>
      <DataTableContractComponent
        Data={Data}
        page={page}
        pageSize={pageSize}
        setPage={setPage}
        setPageSize={setPageSize}
        totalRecords={Data?.recordsTotal || 0}
        setSearch={setSearch}
      />
    </LayoutComponent>
  );
}
