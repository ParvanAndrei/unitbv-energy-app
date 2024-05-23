export const handleLogout = async () => {
    try {
        // Trimite request-ul de logout la backend
        window.location.href = 'http://localhost:8000/logout';
    } catch (error) {
        console.error('Logout error:', error);
    }
};