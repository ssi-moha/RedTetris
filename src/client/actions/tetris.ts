export const TETRIS = "TETRIS";

export const tetris = (field: number[][]) => {
    return {
        field,
        type: TETRIS,
    }
}