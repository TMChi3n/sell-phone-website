import CardComponent from '../../Components/CardComponents/CardComponent';
import { WrapperCartComponent } from './style';
import { useState } from 'react';

import { Link } from 'react-router-dom';

function SearchPage() {
    const [products, setProducts] = useState([
        {
            id_product: 4,
            nameProduct: 'iPhone 15',
            price: '27689999.00',
            stock_quantity: 50,
            descrip_product:
                'iPhone 15 Pro Max được thiết kế mới với khung viền từ titan chuẩn hàng không vũ trụ, mang lại trọng lượng nhẹ và độ bền cao, cùng viền cạnh mỏng tạo cảm giác cầm nắm thoải mái. Với chip A17 Pro mạnh mẽ, điện thoại này mang lại hiệu năng Pro cho trải nghiệm chiến game sống động và chân thực. Ngoài ra, iPhone 15 Pro Max cũng có cụm 3 camera sau đến 48MP và nhiều chế độ quay phim chuyên nghiệp. Sản phẩm còn được trang bị nút tác vụ mới giúp kích hoạt tính năng yêu thích nhanh chóng. Chip A17 Pro của iPhone 15 Pro Max được sản xuất trên tiến trình 3nm, cải thiện hiệu suất CPU và GPU lên tới 10% và 20% lần lượt, cùng tiết kiệm năng lượng.',
            url_picture: {
                type: 'Buffer',
                data: [
                    104, 116, 116, 112, 115, 58, 47, 47, 99, 100, 110, 50, 46, 99, 101, 108, 108, 112, 104, 111, 110,
                    101, 115, 46, 99, 111, 109, 46, 118, 110, 47, 51, 53, 56, 120, 47, 109, 101, 100, 105, 97, 47, 99,
                    97, 116, 97, 108, 111, 103, 47, 112, 114, 111, 100, 117, 99, 116, 47, 105, 47, 112, 47, 105, 112,
                    104, 111, 110, 101, 49, 53, 45, 112, 114, 111, 45, 109, 97, 120, 45, 116, 105, 116, 97, 110, 45,
                    116, 114, 97, 110, 103, 46, 106, 112, 103,
                ],
            },
            brand: 'Apple',
        },
    ]);

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                background: '#f5f5fa',
                borderRadius: '40px',
            }}
        >
            <WrapperCartComponent>
                <div style={{ width: '100% ', height: '40px' }}>
                    <div
                        style={{
                            width: '300px ',
                            height: '100%',
                            padding: '5px 0',
                            marginLeft: '70px',
                            backgroundColor: '#00483d',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center ',
                        }}
                    >
                        <p style={{ fontWeight: '600', color: 'var(--primary-color)' }}>GỢI Ý DÀNH CHO BẠN</p>
                    </div>
                </div>

                {products.map((item) => {
                    return (
                        <Link key={item.id_product} to={`/product/${item.id_product}`}>
                            <CardComponent data={item}></CardComponent>
                        </Link>
                    );
                })}
            </WrapperCartComponent>
        </div>
    );
}

export default SearchPage;
