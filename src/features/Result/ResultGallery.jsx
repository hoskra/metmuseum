import { HStack, IconButton, Text } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";

import { ResultGalleryItem } from "./ResultGalleryItem"
import { selectIDs, isFetching, previousPage, nextPage, selectTotalPageCount, selectCurrentPage } from '../Search/SearchSlice';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'

export const ResultGallery = () => {
    const objectIDs = useSelector(selectIDs)
    const fetching = useSelector(isFetching)

    return (
        <>
            {!fetching && objectIDs?.length > 0 && <ResultGalleryWrapped objectIDs={objectIDs} />}
        </>
    )
}

const ResultGalleryWrapped = ({ objectIDs }) => {
    const dispatch = useDispatch()
    const totalPageCount = useSelector(selectTotalPageCount)
    const currentPage = useSelector(selectCurrentPage)

    const handleLeftClick = () => dispatch(previousPage())
    const handleRightClick = () => dispatch(nextPage())

    return (
        <HStack display="block" position="relative">
            <IconButton 
                onClick={handleLeftClick}
                position="absolute" 
                top="100px" 
                left="-40px"
                size="sm"
                icon={<ChevronLeftIcon />} />
            <HStack 
                    className="metmuseum-gallery"
                    height="230px" 
                    display="flex" 
                    flexDir="row" 
                    justifyContent="center" 
                    alignItems="flex-start">
                {
                    objectIDs.map((id, i) => <ResultGalleryItem key={i} objectID={id} />)
                }
            </HStack>
            <IconButton 
                onClick={handleRightClick}
                position="absolute" 
                top="100px" 
                right="-40px"
                size="sm"
                icon={<ChevronRightIcon />} />
            <Text textAlign="right" color="grey" fontSize="14px" py={2}>
                Page {currentPage} out of {totalPageCount}.
            </Text>
        </HStack>
    )
}