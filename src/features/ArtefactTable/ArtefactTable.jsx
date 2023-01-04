import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { Image, Box } from "@chakra-ui/react"
import { NotAllowedIcon } from "@chakra-ui/icons";

import { selectIDs } from "../Search/SearchSlice";
import { CustomMaterialPagination } from './CustomPagination.jsx'
import { fetchData, selectData, isDataLoading } from "./ArtefactTableSlice"
import { ArtefactDetail } from './ArtefactDetail'

const columns = [
  {
    name: 'Title',
    selector: row => row.title,
    sortable: true,
  },
  {
    name: 'Preview',
    selector: row => (
      <>
        {row.primaryImageSmall ?
          <div height="50px" width="100%" >
            <Image
              src={row.primaryImageSmall}
              alt={row.title}
              height="50px"
              width="60px"
              mx="auto"
              my={1}
              objectFit="cover"
            />
          </div>
          :
          <Box height="20px" display="flex" m="auto" width="60px">
            <NotAllowedIcon w={5} h={5} color="#d7d7d7" m="auto" className="not-allowed-icon" />
          </Box>
        }
      </>
    ),
    sortable: true,
  },
  {
    name: 'Artist',
    selector: row => row.artistDisplayName,
    sortable: true,
  },
  {
    name: 'Department',
    selector: row => row.department,
    sortable: true,
    hide: 'md'
  },
];

const tableCustomStyles = {
  headCells: {
    style: {
      fontWeight: 'bold',
      paddingLeft: '8px',
    },
  },
  cells: {
    style: {
      width: '80px',
      paddingLeft: '8px',
      paddingRight: '8px',
    },
  },
}

export const ArtefactTable = () => {
  const [currentRow, setCurrentRow] = useState(null);
  const dispatch = useDispatch();
  const objectIDs = useSelector(selectIDs);
  const loading = useSelector(isDataLoading);
  const data = useSelector(selectData);

  useEffect(() => {

    dispatch(fetchData(objectIDs))

  }, [objectIDs]);

  useEffect(() => {

    console.log(data)

  }, [data]);

  return (
    <>
      {data && <DataTable
        highlightOnHover
        expandableRows
        expandableRowExpanded={(row) => (row === currentRow)}
        expandOnRowClicked
        onRowClicked={(row) => setCurrentRow(row)}
        expandableRowsComponent={ArtefactDetail}
        onRowExpandToggled={(bool, row) => setCurrentRow(row)}
        columns={columns}
        data={data}
        pagination
        paginationComponent={CustomMaterialPagination}
        customStyles={tableCustomStyles}
        progressPending={loading}
        paginationPerPage={20}
      />}
    </>
  )
};