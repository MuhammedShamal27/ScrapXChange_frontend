const switchRole = (role) => {
    if (role === 'shop') {
        navigate('/shop/login', { replace: true });
    } else if (role === 'user') {
        navigate('/login', { replace: true });
    } else if (role === 'admin') {
        navigate('/admin/login', { replace: true });
    }
    // Clear or manage history here if needed
};
