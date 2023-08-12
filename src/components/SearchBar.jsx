import { Paper, IconButton } from '@mui/material';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Search } from '@mui/icons-material';


const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Paper
            component={"form"}
            onSubmit={() => {
                if (searchTerm) {
                    return <Navigate to={`/search/${searchTerm}`} />;
                }
            }}
            sx={{
                borderRadius: 20,
                border: '1px solid #e3e3e3',
                pl: 2,
                boxShadow: 'none',
                mr: { sm: 5 },
            }}
        >
            <input type="text"
                className='search-bar'
                placeholder='Search...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IconButton type="submit" sx={{ p: '10px', color: "red" }} aria-label="search">
                <Search />
            </IconButton>
        </Paper>
    );
};

export default SearchBar;