import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import classNames from 'classnames/bind';
import styles from '../Header/Header.module.scss';
import images from '../../assets/images';
import { ShoppingCartOutlined } from '@ant-design/icons';
import Button from '../Button';
import Search from '../Search';

const cx = classNames.bind(styles);

function Header({ isHiddenSearch = false, isHiddenCart = false }) {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="Logo"></img>
                </div>
                {/* search */}
                {isHiddenSearch ? <div /> : <Search />}

                <div className={cx('action')}>
                    <Link to={'/sign-in'}>
                        <Button primary>Đăng nhập</Button>
                    </Link>
                </div>

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
