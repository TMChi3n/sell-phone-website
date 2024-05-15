import { Table } from 'antd';
import { useState, useEffect } from 'react';
import { getAllUserRequest } from '../../apiService/apiService';
import Loading from '../Loading/Loading';
function AdminUser() {
    const [user, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            const data = await getAllUserRequest();
            setLoading(false);
            setUsers(data.data);
        };
        fetchApi();
    }, []);
    console.log(user);

    const columns = [
        {
            title: 'Tên người dùng',
            dataIndex: 'name',
            key: '1',
            // render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: '2',
        },

        {
            title: 'Admin',
            key: '3',
            dataIndex: 'admin',
            render: (text) => (
                <div>
                    <h5>{text}</h5>
                </div>
            ),
        },
    ];
    const data = user.map((item, index) => {
        return {
            key: index,
            name: item.username,
            email: item.email,
            admin: item.isAdmin,
        };
    });
    return (
        <div>
            <h4 style={{ marginBottom: '50px', marginTop: '20px' }}> Danh sách người dùng </h4>
            <Loading isLoading={loading}>
                <Table style={{ width: '1000px', height: '100%' }} columns={columns} dataSource={data} />
            </Loading>
        </div>
    );
}

export default AdminUser;
