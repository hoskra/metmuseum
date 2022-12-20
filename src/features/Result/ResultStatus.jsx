import { Container, Box, Text, Spinner } from "@chakra-ui/react"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

import { fetchGetTotal, selectTotal } from "./ResultSlice"
import { selectFound, didSearch, isFetching, isError } from '../Search/SearchSlice';

export const ResultStatus = ({ }) => {
    const found = useSelector(selectFound)
    const total = useSelector(selectTotal)
    const fetching = useSelector(isFetching)
    const error = useSelector(isError)
    const search = useSelector(didSearch)
    const dispatch = useDispatch()

    useEffect(() => { dispatch(fetchGetTotal()) },)

    if (error)
        return (
            <Container py={4} display="flex">
                <Text m="auto" fontSize="15px" color="metmusem.gray">Could not retrieve any data.</Text>
            </Container>
        )

    if (fetching)
        return (
            <Container py={4} display="flex">
                <Box m="auto" display="flex">
                    <Text fontSize="15px" color="metmusem.gray">Searching artefacts matching given query ..</Text>
                    <Spinner ml={2} size='sm' />
                </Box>
            </Container>
        )

    if (search)
        return (
            <Container py={4} display="flex">
                <Text m="auto" fontSize="15px" color="metmusem.gray">{found} out of total {total} artefacts match the query.</Text>
            </Container>
        )
}