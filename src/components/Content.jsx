import { Container } from "@chakra-ui/react"

import { ArtefactTable } from "../features/ArtefactTable/ArtefactTable";
import { ResultStatus } from "../features/Result/ResultStatus";
import { SearchComponent } from "../features/Search/SearchComponent";

export const Content = () => {
    return (
        <Container
            maxWidth="1000px"
            w={{sm:'400px', md:'760px', lg:'950px', xl:'1200px'}}
        >
            <SearchComponent />
            <ResultStatus />
            <ArtefactTable />
        </Container>
    )
}

