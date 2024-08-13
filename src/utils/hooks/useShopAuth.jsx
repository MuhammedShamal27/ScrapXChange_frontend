import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useShopAuth = () => {
    const navigate = useNavigate();
    const shopAuth = useSelector((state) => state.shop.token);

    useEffect(() => {
        if (!shopAuth) {
            navigate('/shop/login', { replace: true });
        }
    }, [shopAuth, navigate]);

    return shopAuth;
};

export default useShopAuth;
