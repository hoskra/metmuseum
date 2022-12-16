import { Input, Select, IconButton, VStack, HStack } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { firstLetterInCapital } from '../../utils/index'
import { searchQuery, resetSearch } from './SearchSlice';
import { resetDetail } from '../Result/ResultSlice';

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
    const [option, setOption] = useState(0)
    const [text, setText] = useState('')
    const dispatch = useDispatch()

    const handleSelect = e => setOption(e.target.value)
    const handleChange = e => setText(e.target.value)
    const handleKeyDown = e => {
        if (e.keyCode == 13) {
            dispatch(resetSearch);
            dispatch(resetDetail);
            dispatch(searchQuery(options[option].parameter, firstLetterInCapital(text)));
        }
    }
    const handleSearch = e => {
        dispatch(resetSearch);
        dispatch(resetDetail);
        dispatch(searchQuery(options[option].parameter, firstLetterInCapital(text)));
    }

    return (
        <VStack>
            <HStack>
                <Select onClick={handleSelect} size='sm'>
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