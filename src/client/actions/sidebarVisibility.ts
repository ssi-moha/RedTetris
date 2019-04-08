export const SIDEBAR_VISIBILITY = "SIDEBAR_VISIBILITY";

export const sidebarVisibility = (visibility: boolean) => {
    return {
        sidebarVisibility: visibility,
        type: SIDEBAR_VISIBILITY,
    }
}
