// https://codesandbox.io/s/fxx0v?file=/src/App.js:295-430

import React from 'react';
import { useDispatch, useSelector } from "react-redux";

import {
  Flex,
  IconButton,
  Text,
  Tooltip,
  Select,
  HStack
} from "@chakra-ui/react";

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';

import { previousPage, nextPage, setPageSize, setPage, selectTotalPageCount, selectItemCount, selectCurrentPage } from "../Search/SearchSlice"

import "./styles.css"

export const CustomMaterialPagination = () => {
  const pageCount = useSelector(selectTotalPageCount);
  const pageSize = useSelector(selectItemCount);
  const currentPage = useSelector(selectCurrentPage);
  const dispatch = useDispatch();

  const handlePrev = () => dispatch(previousPage())
  const handleNext = () => dispatch(nextPage())

  return (
    <Flex justifyContent="space-between" my={4} alignItems="center">
      <HStack>
        <Text size={4}>
          Show
        </Text>
        <Select
          className="paginationSelect"
          h="24px"
          value={pageSize}
          onChange={(e) => {
            dispatch(setPageSize(Number(e.target.value)));
          }}
          icon={<ArrowDropDown />}
        >
          {[5, 10, 20].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </Select>
      </HStack>


      <Flex alignItems="center">
        <Text flexShrink="0" mr={4}>
          Page{" "}
          <Text fontWeight="bold" as="span">
            {currentPage}
          </Text>{" "}
          of{" "}
          <Text fontWeight="bold" as="span">
            {pageCount}
          </Text>
        </Text>
      </Flex>

      {/* <Text flexShrink="0">Go to page:</Text>{" "}
      <NumberInput
        ml={2}
        mr={8}
        w={28}
        min={1}
        max={pageCount}
        onChange={(value) => {
          const page = value ? value - 1 : 0;
          dispatch(setPage(page));
        }}
        defaultValue={currentPage}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
       */}

      <Flex>
        <Tooltip label="First Page" >
          <IconButton
            onClick={() => dispatch(setPage(1))}
            isDisabled={!(currentPage != 1)}
            icon={<FirstPageIcon h={2} w={2} />}
            mr={2} minWidth={4} height={6}
          />
        </Tooltip>
        <Tooltip label="Previous Page">
          <IconButton
            onClick={handlePrev}
            isDisabled={!(currentPage != 1)}
            icon={<KeyboardArrowLeft h={6} w={6} />}
            mr={2} minWidth={4} height={6}
          />
        </Tooltip>
        <Tooltip label="Next Page">
          <IconButton
            onClick={handleNext}
            isDisabled={!(currentPage != pageCount)}
            icon={<KeyboardArrowRight h={6} w={6} />}
            mr={2} minWidth={4} height={6}
          />
        </Tooltip>
        <Tooltip label="Last Page">
          <IconButton
            onClick={() => dispatch(setPage(pageCount))}
            isDisabled={!(currentPage != pageCount)}
            icon={<LastPageIcon h={3} w={3} />}
            mr={2} minWidth={4} height={6}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};
