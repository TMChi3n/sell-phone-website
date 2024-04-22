import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import classNames from 'classnames/bind';
import styles from '../Header/Header.module.scss';
import images from '../../assets/images';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Button from '../Button';
import Search from '../Search';
import { useSelector } from 'react-redux';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Popover } from 'antd';

const cx = classNames.bind(styles);

function Header({ isHiddenSearch = false, isHiddenCart = false }) {
    const user = useSelector((state) => state.user);
    console.log(user);
    const content = (
        <div>
            {user?.isAdmin === 'USER' ? (
                <Link to="/admin">
                    <p style={{ fontSize: '1.3rem', paddingTop: '5px', paddingBottom: '10px' }}>Quản lí bán hàng</p>
                </Link>
            ) : (
                <div></div>
            )}
            <p>
                Log out
                <span style={{ marginLeft: '10px' }}>
                    <LogoutOutlined />
                </span>
            </p>
        </div>
    );
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="Logo"></img>
                </div>
                {/* search */}
                {isHiddenSearch ? <div /> : <Search />}
                <Popover content={content}>
                    <div className={cx('action')}>
                        {user.name ? (
                            <div>
                                <span style={{ fontSize: '20px', marginRight: '20px' }}>
                                    <UserOutlined />
                                </span>
                                {user.name}
                            </div>
                        ) : (
                            <Link to={'/sign-in'}>
                                <Button primary>Đăng nhập</Button>
                            </Link>
                        )}
                    </div>
                </Popover>

                {isHiddenCart ? (
                    <div />
                ) : (
                    <div className={cx('cart')}>
                        <Link to="/cart">
                            <ShoppingCartOutlined />
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
