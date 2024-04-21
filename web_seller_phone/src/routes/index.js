import HomePage from '../page/HomePage/HomePage';
import OrderPage from '../page/OrderPage/OrderPage';
import ProductPage from '../page/ProductPage/ProductPage';
import CartPage from '../page/CartPage/CartPage';
import NotFoundPage from '../page/NotFoundPage/NotFoundPage';

import CheckoutPage from '../page/CheckoutPage/CheckoutPage';
import ProductDetailPage from '../page/ProductDetailPage/ProductDetailPage';
import SignInPage from '../page/SignInPage/SignInPage';
import SignUpPage from '../page/SignUpPage/SignUpPage';
import SearchPage from '../page/SearchPage/SearchPage';
import AdminPage from '../page/AdminPage/AdminPage';
import AdminLayout from '../Components/Layouts/AdminLayout';
const publicRoutes = [
    { path: '/', component: HomePage },
    { path: '/order', component: OrderPage },
    { path: '/products', component: ProductPage },
    { path: '/cart', component: CartPage },
    { path: '*', component: NotFoundPage, layout: null },

    { path: '/checkout', component: CheckoutPage },
    { path: '/product/:id', component: ProductDetailPage },
    { path: '/sign-in', component: SignInPage, layout: null },
    { path: '/sign-up', component: SignUpPage, layout: null },
    { path: '/search', component: SearchPage },
    { path: '/admin', component: AdminPage, layout: AdminLayout },
];
const privateRoutes = [];
export { privateRoutes, publicRoutes };
