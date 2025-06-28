export function validateRequest(body: any): { isValid: boolean; error?: string } {
    if (!body.userId) {
        return { isValid: false, error: "User ID required" };
    }

    if (!body.action) {
        return { isValid: false, error: "Action required" };
    }

    const validActions = ['getContext', 'store', 'getUserMemories'];
    if (!validActions.includes(body.action)) {
        return { isValid: false, error: "Invalid action" };
    }

    if (body.action === 'getContext' && !body.query) {
        return { isValid: false, error: "Query required for getContext action" };
    }

    if (body.action === 'store' && !body.content) {
        return { isValid: false, error: "Content required for store action" };
    }

    return { isValid: true };
}