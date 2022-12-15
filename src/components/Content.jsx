import { Container } from "@chakra-ui/react"

import { ResultDetail } from "../features/Result/ResultDetail";
import { ResultGallery } from "../features/Result/ResultGallery";
import { ResultStatus } from "../features/Result/ResultStatus";
import { SearchComponent } from "../features/Search/SearchComponent";

export const Content = () => {
    return (
        <Container>
            <SearchComponent />
            <ResultStatus />
            <ResultGallery />
            <ResultDetail />
        </Container>
    )
}

