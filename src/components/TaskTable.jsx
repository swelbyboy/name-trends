import React from "react"; // Add React import
import {
  Container,
  Center,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Button,
  ButtonGroup,
  Text,
} from "@chakra-ui/react";
import SearchIcon from "../components/icons/SearchIcon";
import { useState, useEffect } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
//import names from "../1_14_names_enriched.json";
//import names from "../../src/table_data_male.json";
import names from "../../src/top_1000_table_data_final.json";
import Filters from "./Filters";
import SortIcon from "./icons/SortIcon";
import TableLineChart from "./TableLineChart";
import { useNavigate } from "react-router-dom";
//import FilterPopover from "./FilterPopover";
import CallToActionWithVideo from './CallToActionWithVideo';


const TaskTable = () => {
  const [selectedName, setSelectedName] = useState('');
  const navigate = useNavigate();
  const [data, setData] = useState(names);
  const [columnFilters, setColumnFilters] = useState([
    //{
    //id: 'initial',
    //value: 'A',
    //   id: 'gender',
    //   value: 'F',
    //}
  
  ]);

  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState([
    {
      id: '2022_rank',
      desc: false,
    }
  ]);

  const handleSeeMoreClick = (name) => {
    const selectedNameData = data.find((item) => item.name === name);
    setSelectedName(selectedNameData);
    navigate(`/NamePage/${name}`, { state: { selectedNameData } });
  };
  
  const rankSort = (rowA, rowB, id, desc) => {
    const valA = rowA.getValue(id);
    const valB = rowB.getValue(id);
  
    // Convert to numbers if not 'n/a'
    const numA = valA === 'n/a' ? Infinity : parseFloat(valA);
    const numB = valB === 'n/a' ? Infinity : parseFloat(valB);
  
    
    console.log(`Comparing ${valA} and ${valB}`); // Add this line for debugging
    
    // Sort numerically, placing 'n/a' at the end
    return numA - numB;

    
  };  
    
  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      size: 100,
      //enableColumnFilter: true,
      enableSorting: false,
      //filterFn: "includesString",
      cell: (props) => (
        <Center height="100%">
          {props.row.original.name}
        </Center>
      ),
    },  
    {
      accessorKey: "gender",
      header: "Gender", // Corrected typo in header
      size: 100,
      enableColumnFilter: true,
      enableSorting: false,
      disableSortRemove: true,
      filterFn: "includesString",
      cell: (props) => (
        <Center height="100%">
          {props.row.original.gender}
        </Center>
      ),
    },
    {
      accessorKey: "initial",
      header: "Initial", // Corrected typo in header
      size: 100,
      enableSorting: false,
      //enableColumnFilter: true,
      cell: (props) => (
        <Center height="100%">
          {props.row.original.initial}
        </Center>
      ),
    },
    {
      accessorKey: "origin",
      size: 100,
      header: "Origin",
      filterFn: "includesString",
      enableSorting: false,
      cell: (props) => (
        <Center height="100%">
          {props.row.original.origin}
        </Center>
      ),
    },
    {
      accessorKey: "2022_rank",
      header: "2022 Popularity Rank",
      size: 175,
      //enableMultiSort: false,
      enableSorting: true,
      sortType: rankSort, // Use the custom sorting function
      sortDescFirst: false, // Default to ascending order
      //sortUndefined: false,
      cell: (props) => (
        <Center height="100%">
          {props.row.original["2022_rank"]}
        </Center>
      ),
    },    
    {
      accessorKey: "etymology",
      header: "Etymology",
      size: 300,
      enableSorting: false,
    },
    // {
    //   accessorKey: "description",
    //   header: "Description",
    //   size: 225,
  
    // },
    // {
    //   accessorKey: "similar names", 
    //   header: "Similar names",
    //   size: 225,
    // },
    // {
    //   accessorKey: "famous people", 
    //   header: "Famous people",
    //   size: 225,
    // },
    {
      accessorKey: "data",
      header: "Time Series",
      size: 225,
      enableSorting: false,
      cell: (props) => {
        // Pass the name prop to TableLineChart
        return <TableLineChart name={props.row.original.name} />;
      },
    },
    {
      accessorKey: "seeMore",
      header: "See More",
      size: 125,
      enableSorting: false,
      cell: (props) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Button
            colorScheme='blue'
            size='sm'
            onClick={() => handleSeeMoreClick(props.row.original.name)}
          >
            See more
          </Button>
        </div>
      ),
    },    
  ];

  const table = useReactTable({
    data,
    columns,
    enableSortingRemoval: false,
    //disableSortRemove: true,
    defaultCanSort: true,
    //useSortBy,
    //defaultCanSort
    initialState: {
      sorting: [
        {
          id:'2022_rank',
          desc: false,
        }
      ]
    },
    state: {
      columnFilters,
      globalFilter: filtering,
      sorting: sorting,
    },
    
    //useSortBy,
    enableColumnFilters: true,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: 'onChange',
    onGlobalFilterChange: setFiltering,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,

  });

  return (
    <Container maxW={'7xl'}>
      <Center>
    <Box>
      {/* in the future, this can be moved to a separate 'Search' component */}
      <HStack mb={6} spacing={3}>
        <InputGroup size="sm" maxW="12rem">
          <InputLeftElement pointerEvents="none">
            <Icon as={SearchIcon} />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search"
            borderRadius={5}
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            //placeholderColor="gray.500" // Set placeholder text color
            borderColor="gray.500" // Set border color
          />  
        </InputGroup>
        <Filters
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        setFiltering={setFiltering}  // <-- Pass filtering state here
        />
      </HStack>
      
      <Box className="table" w={table.getTotalSize()}>
        {table.getHeaderGroups().map((headerGroup) => (
          <Box className="tr" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Box className="th" w={header.getSize()} key={header.id}>
                {header.column.columnDef.header}
                {header.column.getCanSort() && (
                  <Icon
                    as={SortIcon}
                    mx={3}
                    fontSize={14}
                    onClick={header.column.getToggleSortingHandler()}
                  />
                )}
                {header.column.getIsSorted() && (
                  <Box
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={`resizer ${
                      header.column.getIsResizing() ? "isResizing" : ""
                    }`}
                  />
                )}
              </Box>
            ))}
          </Box>
        ))}
        {table.getRowModel().rows.map((row) => (
          <Box className="tr" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Box className="td" w={cell.column.getSize()} key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      <br />
      <Text mb={2}>
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </Text>
      <ButtonGroup size="sm" isAttached variant="outline">
        <Button
          colorScheme='black'
          size='sm'
          onClick={() => table.previousPage()}
          isDisabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </Button>
        <Button
          colorScheme='black'
          size='sm'
          onClick={() => table.nextPage()}
          isDisabled={!table.getCanNextPage()}
        >
          {">"}
        </Button>
      </ButtonGroup>
    </Box>
    </Center>
    </Container>
  );
};

export default TaskTable;