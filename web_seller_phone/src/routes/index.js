import HomePage from '../page/HomePage/HomePage';
import OrderPage from '../page/OrderPage/OrderPage';
import ProductPage from '../page/ProductPage/ProductPage';
import CartPage from '../page/CartPage/CartPage';
import NotFoundPage from '../page/NotFoundPage/NotFoundPage';
import CheckoutPage from '../page/CheckoutPage';
import InsertPage from '../page/InsertPage';
import UpdatePage from '../page/UpdatePage';

const publicRoutes = [
    { path: '/', component: HomePage },
    { path: '/order', component: OrderPage },
    { path: '/products', component: ProductPage },
    { path: '/cart', component: CartPage },
    { path: '/checkout', component: CheckoutPage },
    { path: '*', component: NotFoundPage, layout: null },
    { path: '/product/add', component: InsertPage },
    { path: '/product/update', component: UpdatePage },
];
const privateRoutes = [];
export { privateRoutes, publicRoutes };
