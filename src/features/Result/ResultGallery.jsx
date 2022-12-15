import { HStack } from "@chakra-ui/react"
import { useSelector } from "react-redux";

import { ResultGalleryItem } from "./ResultGalleryItem"
import { selectIDs, isFetching } from '../Search/SearchSlice';

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
    return (
        <HStack height="230px" display="flex" flexDir="row" justifyContent="center" alignItems="flex-start">
            {
                objectIDs.map((id, i) => <ResultGalleryItem key={i} objectID={id} />)
            }
        </HStack>
    )
}