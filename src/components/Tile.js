import React from 'react';
import { Button } from "@mui/material";
// import { shadows } from '@mui/system'

function Tile(props) {

    return (
        <Button
            variant='contained'
            onClick={() => props.onClick()}
            className='tile'
            sx={{
                fontSize: 60,
                borderRadius: 3,
                width: '150px',
                height: '150px',
                backgroundColor: '#363636',
                '&:hover': {
                    backgroundColor: '#282828',
                }
            }}>
            {props.getValueFromBoard(props.index)}
        </Button>

    );
}

export default Tile;
