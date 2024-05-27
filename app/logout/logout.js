export const handleLogout = async () => {
    try {
        // Trimite request-ul de logout la backend
        window.location.href = 'http://localhost:90/energy/redirect_uri?logout=http://localhost:90/energy';
    } catch (error) {
        console.error('Logout error:', error);
    }
};