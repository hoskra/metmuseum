import { Input, Select, IconButton, VStack, HStack } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { firstLetterInCapital } from '../../utils/index'
import { setOption, searchQuery, resetSearch, selectOption, selectSearchedTerm, setSearchedTerm } from './SearchSlice';

const options = [
    {
        name: "Title",
        parameter: "title",
        multiple: false
    },
    {
        name: "Artist or Culture",
        parameter: "artistOrCulture",
        multiple: false
    },
    {
        name: "Location",
        parameter: "geoLocation",
        multiple: true
    },
    {
        name: "Tags",
        parameter: "tags",
        multiple: true
    },
]

export const SearchComponent = () => {
    const stateOption = useSelector(selectOption);
    const searchedTerm = useSelector(selectSearchedTerm);
    const [option, setLocalOption] = useState(0)
    const [text, setText] = useState('')
    const dispatch = useDispatch()

    useEffect(() => setLocalOption(stateOption), [stateOption])
    useEffect(() => setText(searchedTerm), [searchedTerm])

    const handleSelect = e => {
        setLocalOption(e.target.value)
        setOption(e.target.value)
    }
    const handleChange = e => {
        setSearchedTerm(e.target.value)
        setText(e.target.value)
    }
    const handleKeyDown = e => {
        if (e.keyCode == 13 && text) {
            dispatch(resetSearch);
            dispatch(searchQuery(options[option].parameter, firstLetterInCapital(text)));
        }
    }
    const handleSearch = e => {
        if (text) {
            dispatch(resetSearch);
            dispatch(searchQuery(options[option].parameter, firstLetterInCapital(text)));
        }
    }

    return (
        <VStack>
            <HStack>
                <Select onChange={handleSelect} size='sm' value={option}>
                    {options.map(((option, i) => <option value={i} key={i}>{option.name}</option>))}
                </Select>
                <Input autoFocus={true}
                    value={text}
                    onChange={handleChange}
                    size='sm'
                    onKeyDown={handleKeyDown}
                />
                <IconButton size='sm' icon={<SearchIcon />} onClick={handleSearch}></IconButton>
            </HStack>
        </VStack>
    )
}