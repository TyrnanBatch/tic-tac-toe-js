import {Box, Grow} from '@mui/material';
import Board from './components/Board'

function App() {

    return (
        <Box sx={{
            width: window.innerWidth,
            height: window.innerHeight,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Board/>
        </Box>
    );
}

export default App;
