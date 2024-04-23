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
import { WrapperQualityProduct } from '../ProductDetailComponent/style';
import { useSelector } from 'react-redux';

const CartItem = ({ product, onRemove, onIncrease, onDecrease }) => {
    // Calculate total price for the product
    const totalPrice = product.price * product.quantity;
    const order = useSelector((state) => state.order);
    console.log(order);

    return (
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
