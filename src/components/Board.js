import React from 'react';
import {Box, Grid, Chip, Button} from "@mui/material";
import Tile from './Tile';

const swap = (history, index, value) => {
    history[index] = value
    return history
}

const check = (his) => {
    let lines = [
        [his[0], his[1], his[2]],
        [his[3], his[4], his[5]],
        [his[6], his[7], his[8]],

        [his[0], his[3], his[6]],
        [his[1], his[4], his[7]],
        [his[2], his[5], his[8]],

        [his[0], his[4], his[8]],
        [his[2], his[4], his[6]],
    ]

    for (let i = 0; i < 8; i = i + 1) {
        if ((lines[i][0] === lines[i][1] && lines[i][0] === lines[i][2]) && lines[i][1] !== " ") {
            return lines[i][0]
        }
    }
    return false
}

let goCount = 0

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            winner: "...",
            freezeBoard: false,
            p1Count: 0,
            p2Count: 0,
            player: "X",
            history: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
            tiles: this.getInitialTileState()
        }
        ;
    }

    getInitialTileState = () => {
        return [
            <Tile onClick={(e) => this.onClick(0)} getValueFromBoard={this.getTileValue} index={0}/>,
            <Tile onClick={(e) => this.onClick(1)} getValueFromBoard={this.getTileValue} index={1}/>,
            <Tile onClick={(e) => this.onClick(2)} getValueFromBoard={this.getTileValue} index={2}/>,
            <Tile onClick={(e) => this.onClick(3)} getValueFromBoard={this.getTileValue} index={3}/>,
            <Tile onClick={(e) => this.onClick(4)} getValueFromBoard={this.getTileValue} index={4}/>,
            <Tile onClick={(e) => this.onClick(5)} getValueFromBoard={this.getTileValue} index={5}/>,
            <Tile onClick={(e) => this.onClick(6)} getValueFromBoard={this.getTileValue} index={6}/>,
            <Tile onClick={(e) => this.onClick(7)} getValueFromBoard={this.getTileValue} index={7}/>,
            <Tile onClick={(e) => this.onClick(8)} getValueFromBoard={this.getTileValue} index={8}/>
        ]
    }

    getTileValue = (index) => {
        return this.state.history[index];
    }

    reset = () => {
        this.setState({
            history: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
            tiles: this.getInitialTileState(),
            player: "X",
            freezeBoard: false,
            winner: "..."
        })
    }

    onClick = (i) => {
        // updates history array
        if (this.state.history[i] === " " && !this.state.freezeBoard) {
            this.setState({history: swap(this.state.history, i, this.state.player)})
            if (this.state.player === "X") {
                this.setState({player: "0"})
            } else {
                this.setState({player: "X"})
            }

            // updates tile values
            this.setState({
                tiles: swap(this.state.tiles, i, <Tile onClick={(e) => this.onClick(i)}
                                                       getValueFromBoard={this.getTileValue} index={i}/>)
            })

            // logic stuff
            if (check(this.state.history) === "X") {
                // X win
                this.setState({
                    p1Count: this.state.p1Count + 1,
                    freezeBoard: true,
                    winner: this.state.player
                })
                goCount = 0
            } else if (check(this.state.history) === "0") {
                // 0 win
                this.setState({
                    p2Count: this.state.p2Count + 1,
                    freezeBoard: true,
                    winner: this.state.player
                })
                goCount = 0
            } else if (!check(this.state.history)) {
                goCount += 1
                if (goCount > 8) {
                    // draw
                    this.setState({freezeBoard: true})
                    this.setState({winner: "Draw"})
                    goCount = 0
                }
            } else {
                console.log('err')
            }
        }
    }

    render() {

        const tiles = (<>
            <Box
                sx={{
                    maxWidth: '500px',
                }}>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        {this.state.tiles[0]}
                    </Grid>
                    <Grid item xs={4}>
                        {this.state.tiles[1]}
                    </Grid>
                    <Grid item xs={4}>
                        {this.state.tiles[2]}
                    </Grid>
                    <Grid item xs={4}>
                        {this.state.tiles[3]}
                    </Grid>
                    <Grid item xs={4}>
                        {this.state.tiles[4]}
                    </Grid>
                    <Grid item xs={4}>
                        {this.state.tiles[5]}
                    </Grid>
                    <Grid item xs={4}>
                        {this.state.tiles[6]}
                    </Grid>
                    <Grid item xs={4}>
                        {this.state.tiles[7]}
                    </Grid>
                    <Grid item xs={4}>
                        {this.state.tiles[8]}
                    </Grid>
                </Grid>
            </Box>
        </>)
        return (
            <Box sx={{
                width: window.innerWidth,
                height: window.innerHeight,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Box sx={{paddingRight: 4, display: 'flex', justifyContent: 'center', width: '333px'}}>
                    <Chip sx={{fontSize: 40, padding: 4}}
                          variant="outlined"
                          label={"Winner: " + this.state.winner}/>
                </Box>
                <Box>
                    <Box sx={{paddingBottom: 4, display: 'flex', justifyContent: 'center'}}>
                        <Chip
                            sx={{fontSize: 40, padding: 4}}
                            variant="outlined"
                            label={this.state.p1Count + " | " + this.state.p2Count}/>
                    </Box>
                    <Box>{tiles}</Box>
                    <Box sx={{display: 'flex', justifyContent: 'center', paddingTop: 4,}}>
                        <Button sx={{height: '75px', width: '100px', fontSize: 20}}
                                onClick={this.reset}
                                variant={"contained"}
                        >
                            Reset
                        </Button>
                    </Box>
                </Box>
                <Box sx={{paddingLeft: 4, display: 'flex', justifyContent: 'center'}}>
                    <Chip sx={{fontSize: 40, padding: 4, width: '236px'}}
                          variant="outlined"
                          label={this.state.player + "'s Turn"}/>
                </Box>
            </Box>
        );
    }
}

export default Board;
