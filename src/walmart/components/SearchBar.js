import { InputAdornment, Stack } from '@mui/material'
import React, { useState } from 'react'
import { StyledSearchBar } from '../utlities/StyledComponent'
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {

    const [search, setSearch] = useState('')

  return (
    <Stack>
        <StyledSearchBar value={search} type='text' placeholder='Seach...' endAdornment={<InputAdornment position='start'><FiSearch /></InputAdornment>} onChange={(e) => setSearch(e.target.value)} />
    </Stack>
  )
}

export default SearchBar