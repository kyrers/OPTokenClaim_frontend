export const formatErrorMessage = (error: any) => {
    if(error.message.includes("Chain mismatch")) {
        return ": must be connected to optimism network";
    }

    return `${error.reason !== undefined ? `: ${error.reason.replace("execution reverted: ", "")}` : ""}`;
};
