const logout = async (accessToken) => {
    try {
        return { success: true, message: 'Logout successful' };
    } catch (error) {
        throw new Error('Logout failed');
    }
};

export default logout;
