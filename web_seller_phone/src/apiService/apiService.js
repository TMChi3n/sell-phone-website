import request from '../utils/request';
export const getAllProductRequest = async () => {
    try {
        const res = await request.get('/api/get/product');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getProductByIdRequest = async (id) => {
    try {
        const res = await request.get(`/api/get/product/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const searchRequest = async (name) => {
    try {
        const res = await request.get(`/api/search/product`, {
            params: {
                name,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const filterRequest = async (category) => {
    try {
        const res = await request.get(`/api/filter/product`, {
            params: {
                ...category,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getAllUserRequest = async () => {
    try {
        const res = await request.get('/api/get/users');
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const registerRequest = async (data) => {
    try {
        const res = await request.post('/api/post/user', data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const loginRequest = async (data) => {
    try {
        const res = await request.post('/api/post/login', data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getDetailUserRequest = async (id, access_token) => {
    try {
        const res = await request.get(`api/getDetailUser/${id}`, {
            headers: {
                token: `Bearer ${access_token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getCartItemRequest = async (id, access_token) => {
    try {
        const res = await request.get(`api/cart/${id}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const addCartItemRequest = async (data, access_token) => {
    try {
        const res = await request.post(`api/cart/add`, data, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const decreaseItemRequest = async (id_user, id_product, access_token) => {
    try {
        const res = await request.put(
            `api/cart/decrease/${id_user}/${id_product}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            },
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const increaseItemRequest = async (id_user, id_product, access_token) => {
    try {
        const res = await request.put(
            `api/cart/increase/${id_user}/${id_product}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            },
        );
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const deleteItemRequest = async (id_cart_item, access_token) => {
    console.log(access_token);
    try {
        const res = await request.delete(`api/cart/remove/${id_cart_item}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
