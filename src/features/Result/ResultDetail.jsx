import { Card, Box, HStack, List, ListItem, Heading, Link, Image, Grid, GridItem, Tag, Spinner, Text } from "@chakra-ui/react"
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { useSelector } from "react-redux"

import { printIfAvailable } from '../../utils/index'
import { isDetailLoading, selectDetail, isError } from './ResultSlice'
import './styles.css'

export const ResultDetail = () => {
    const loding = useSelector(isDetailLoading)
    const data = useSelector(selectDetail)
    const error = useSelector(isError)

    if (loding) {
        return <Card p={2} height="300px">
            <Box width="300px" m="auto" display="flex">
                <Text>Quering for artefact details ...</Text>
                <Spinner ml={2} size='sm' />
            </Box>
        </Card>
    } else if (error) {
        return <Card p={2} height="200px">
            <Text m="auto" width="300px" >
                Quering details for selected artefact failed.
            </Text>
        </Card>
    } else if (data == null) {
        return (<></>)
    } else {
        return <ResultDetailWidthData data={data} />
    }
}

const RenderItem = ({ name, atribute }) => {
    if (atribute)
        return (
            <>
                <GridItem colStart={1}>
                    <Heading as="h3" fontSize={16}>
                        {name}
                    </Heading>
                </GridItem>
                <GridItem colStart={2}>{printIfAvailable(atribute)}</GridItem>
            </>
        )
}

const ResultDetailWidthData = ({ data }) => {
    return (
        <Card p={2} >
            <Grid templateColumns='1fr 3fr' gap={4} py={4} width="650px" mx="auto">
                <GridItem colStart={1} colSpan={2}>
                    <Heading as="h2" fontSize={32}>
                        {data.title}
                        {data.isHighlight && <Tag ml={2} mt={2} colorScheme='green' variant='solid'>highlited</Tag>}
                    </Heading>
                </GridItem>
                {data.primaryImage &&
                    <GridItem colStart={2}>
                        <div height="150px" width="100%" >
                            <Image
                                src={data.primaryImage}
                                alt={data.title}
                                borderRadius='lg'
                                height="150px"
                                mx="auto"
                            />
                        </div>
                    </GridItem>
                }
                <RenderItem name={"Author name"} atribute={data.artistDisplayName} />
                <RenderItem name={"Department"} atribute={data.department} />
                <RenderItem name={"Culture"} atribute={data.culture} />
                <RenderItem name={"Country"} atribute={data.country} />
                <RenderItem name={"City"} atribute={data.city} />
                <RenderItem name={"Medium"} atribute={data.medium} />
                <RenderItem name={"Dimensions"} atribute={data.dimensions} />
                {(data.objectURL && data.artistWikidata_URL) && <>
                    <GridItem colStart={1}>
                        <Heading as="h3" fontSize={16}>
                            Available Links
                        </Heading>
                    </GridItem>
                    <GridItem colStart={2}>
                        <List>
                            {data.objectURL &&
                                <ListItem>
                                    <Link href={data.objectURL} isExternal>Object URL<ExternalLinkIcon mx='2px' /></Link>
                                </ListItem>
                            }
                            {data.artistWikidata_URL &&
                                <ListItem>
                                    <Link href={data.artistWikidata_URL} isExternal>Artist Wikidata URL<ExternalLinkIcon mx='2px' /></Link>
                                </ListItem>
                            }
                        </List>
                    </GridItem> </>}

                {data.tags && <>
                    <GridItem colStart={1}>
                        <Heading as="h3" fontSize={16}>
                            Tags
                        </Heading>
                    </GridItem>
                    <GridItem colStart={2}>
                        <HStack spacing={2}>
                            {data.tags.map((tag, i) => (
                                <Tag key={i} variant='solid' colorScheme='teal'>
                                    {tag.term}
                                </Tag>
                            ))}
                        </HStack>
                    </GridItem> </>}

            </Grid>
        </Card>
    )
}