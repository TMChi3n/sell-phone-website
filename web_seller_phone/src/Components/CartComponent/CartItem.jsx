// CartItem.js
import React from 'react';
// import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import productImgSmall from '../../assets/images/small.jpg.webp';
import {
    WrapperCartInner,
    WrapperCartInnerLeft,
    WrapperCartInnerRight,
    WrapperCartName,
    WrapperCartContainer,
    WrapperCartPrice,
    WrapperInputNumber,
    WrapperCartRemove,
} from './style';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { WrapperQualityProduct } from '../../page/ProductDetailPage/style';

const CartItem = ({ product, onRemove, onIncrease, onDecrease }) => {
    // Calculate total price for the product
    const totalPrice = product.price * product.quantity;

    return (
        // <div style={{ borderBottom: '2px solid #ccc', padding: '10px 0' }}>
        //     <table style={{ width: '105%' }}>
        //         <tbody>
        //             <tr>
        //                 <td><img src={product.imageUrl} alt={product.name} style={{ width: '1px', height: '1px', objectFit: '10px' }} /></td>
        //                 <td>{product.name}</td>
        //                 <td>${product.price}</td>
        //                 <td>
        //                     <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        //                         <button onClick={() => onDecrease(product.id)} style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '5px', borderRadius: '5px' }}><MinusOutlined /></button>
        //                         <span>{product.quantity}</span>
        //                         <button onClick={() => onIncrease(product.id)} style={{ backgroundColor: '#28a745', color: '#fff', border: 'none', padding: '5px', borderRadius: '5px' }}><PlusOutlined /></button>
        //                     </div>
        //                 </td>
        //                 <td>
        //                     <button onClick={() => onRemove(product.id)} style={{ backgroundColor: 'orange', color: '#fff', border: 'none', padding: '5px', borderRadius: '5px' }}><DeleteOutlined /></button>
        //                 </td>
        //             </tr>
        //         </tbody>
        //     </table>
        // </div>
        <WrapperCartContainer>
            <WrapperCartInner>
                <WrapperCartInnerLeft>
                    <Image preview={false} style={{ width: '70px', height: '70px' }} src={productImgSmall} />
                    <WrapperCartName>Iphone </WrapperCartName>
                </WrapperCartInnerLeft>
                <WrapperCartInnerRight>
                    <WrapperCartPrice>200.000 VNĐ</WrapperCartPrice>
                    <WrapperQualityProduct>
                        <button
                            onClick={() => onDecrease(product.id)}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                cursor: 'pointer',
                                fontSize: '10px',
                            }}
                        >
                            <MinusOutlined style={{ color: '#000', fontSize: '15px' }} />
                        </button>
                        <WrapperInputNumber value={product.quantity} defaultValue={1} min={1} size="small" />
                        <button
                            onClick={() => onIncrease(product.id)}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                cursor: 'pointer',
                                fontSize: '10px',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <PlusOutlined style={{ color: '#000', fontSize: '15px' }} />
                        </button>
                    </WrapperQualityProduct>
                    <button onClick={() => onRemove(product.id)}>
                        <WrapperCartRemove>
                            <DeleteOutlined />
                        </WrapperCartRemove>
                    </button>
                </WrapperCartInnerRight>
            </WrapperCartInner>
        </WrapperCartContainer>
    );
};

export default CartItem;
