export async function callApi(endpoint) {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error('Phản hồi của mạng không ổn');
        }
        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        return { success: false, message: error.message };
    }
}