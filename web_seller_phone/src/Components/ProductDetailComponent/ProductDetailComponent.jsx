import { Row, Col, Image } from 'antd';
import productImg from '../../assets/images/large.jpg.webp';
import productImgSmall from '../../assets/images/small.jpg.webp';
import {
    WrapperStyleImageSmall,
    WrapperStyleColImage,
    WrapperStyleNameProduct,
    WrapperStyleTextSell,
    WrapperPriceProduct,
    WrapperPriceTextProduct,
    WrapperDesciptionProduct,
    WrapperQualityProduct,
    WrapperInputNumber,
} from './style';
import { MinusOutlined, PlusOutlined, StarFilled } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addOrderProduct } from '../../redux/slides/orderSlide';
import { useState } from 'react';

function ProductDetailComponent({ data }) {
    const user = useSelector((state) => state.user);
    console.log(user);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [numProduct, setNumProduct] = useState(1);
    const onChange = (value) => {
        setNumProduct(Number(value));
    };
    console.log(numProduct);

    const { id_product, nameProduct, price, stock_quantity, descrip_product, url_picture } = data;
    const url = url_picture?.data;
    const imageUrl = url
        ? String.fromCharCode(...url)
        : 'https://cdn2.cellphones.com.vn/358x/media/catalog/product/t/_/t_m_19.png';
    const formatted_price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    const handleOrder = () => {
        if (user?.id) {
            dispatch(
                addOrderProduct({
                    orderItem: {
                        name: nameProduct,
                        amount: numProduct,
                        image: imageUrl,
                        price,
                        product: id_product,
                    },
                }),
            );
        } else {
            navigate('/sign-in', { state: location?.pathname });
        }
    };

    return (
        <div>
            <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px', height: '100%' }}>
                <Col style={{ borderRight: '1px solid #e5e5e5', paddingRight: '20px' }} span={10}>
                    <Image src={imageUrl} preview={false} alt="image-product" />
                    <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageUrl} preview={false} alt="productImg" />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageUrl} preview={false} alt="productImg" />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageUrl} preview={false} alt="productImg" />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageUrl} preview={false} alt="productImg" />
                        </WrapperStyleColImage>
                        <WrapperStyleColImage span={4}>
                            <WrapperStyleImageSmall src={imageUrl} preview={false} alt="productImg" />
                        </WrapperStyleColImage>
                    </Row>
                </Col>

                <Col style={{ padding: '70px 100px' }} span={14}>
                    <WrapperStyleNameProduct>{nameProduct}</WrapperStyleNameProduct>
                    <div>
                        <StarFilled style={{ color: 'rgb(253,216,54)' }} />
                        <StarFilled style={{ color: 'rgb(253,216,54)' }} />
                        <StarFilled style={{ color: 'rgb(253,216,54)' }} />
                        <StarFilled style={{ color: 'rgb(253,216,54)' }} />
                        <WrapperStyleTextSell> | Đã bán {stock_quantity} +</WrapperStyleTextSell>
                    </div>
                    <WrapperPriceProduct>
                        <WrapperPriceTextProduct>{formatted_price}</WrapperPriceTextProduct>
                    </WrapperPriceProduct>
                    <WrapperDesciptionProduct>
                        <span className="header-desciption">Mô tả sản phẩm: </span>
                        <br />
                        <p className="body-desciption">{descrip_product}</p>
                    </WrapperDesciptionProduct>

                    <div
                        style={{
                            margin: '10px 0 20px',
                            padding: '10px 0',
                            borderTop: '1px solid #e5e5e5',
                            borderBottom: '1px solid #e5e5e5',
                        }}
                    >
                        <div style={{ marginBottom: '10px' }}>Số lượng</div>

                        <WrapperQualityProduct>
                            <button
                                style={{
                                    border: 'none',
                                    background: 'transparent',
                                    cursor: 'pointer',
                                    fontSize: '10px',
                                }}
                            >
                                <MinusOutlined style={{ color: '#000', fontSize: '15px' }} />
                            </button>
                            <WrapperInputNumber
                                value={numProduct}
                                onChange={onChange}
                                defaultValue={1}
                                min={1}
                                size="small"
                            />
                            <button
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
                    </div>
                    <div>
                        <ButtonComponent
                            onClick={handleOrder}
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 57, 69)',
                                height: '48px',
                                width: '220px',
                                border: 'none',
                                borderRadius: '4px',
                            }}
                            textButton={'Chọn mua'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default ProductDetailComponent;
