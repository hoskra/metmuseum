import { Container, Text, Link } from "@chakra-ui/react"

export const Footer = () => {
    return (
        <Container display="flex" alignItems="end">
            <Text color="metmusem.gray" width="100%" textAlign="center" fontSize="14px">
                Viewer for <Link href="https://www.metmuseum.org/">Metropolitan Museum of Art.</Link>
                &nbsp;See the <Link href="https://metmuseum.github.io/">API</Link> for more information.
            </Text>
        </Container>
    )
}

