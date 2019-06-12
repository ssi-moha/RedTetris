import { TETRIS } from "../actions/tetris";

interface ITetris {
    type: string,
    tetris?: number[][],
}

const tetris = (state = {}, action: ITetris) => {
    switch (action.type) {
        case TETRIS:
            return { tetris: action.tetris };
        default:
            return state;
    }
}

export default tetris;
