import React, { useEffect, useState } from 'react';
import { Header, Alert, Button, Input } from '@cloudscape-design/components';

export default function SignInUp({ setContentHeader }) {
    useEffect(() => {
        setContentHeader(<Header variant="h1">Sign In and Sign Up</Header>);
    }, [setContentHeader]);

    const [alert, setAlert] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.detail.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.detail.value);
    };

    const validateInput = () => {
        const specialCharPattern = /[!@#$%&^*]/;
        if (specialCharPattern.test(username) || specialCharPattern.test(password)) {
            showErrorAlert();
        } else {
            showSuccessAlert();
        }
    };

    const showSuccessAlert = () => {
        setAlert({
            type: 'success',
            header: 'Thành công',
            content: 'Bạn đã nhập ok',
            statusIconAriaLabel: 'Success'
        });
    };

    const showErrorAlert = () => {
        setAlert({
            type: 'error',
            header: 'Thất bại',
            content: 'Bạn nhập sai !@#$%&^*',
            statusIconAriaLabel: 'Error'
        });
    };

    return (
        <>
            {alert && (
                <Alert
                    type={alert.type}
                    header={alert.header}
                    statusIconAriaLabel={alert.statusIconAriaLabel}
                    dismissible
                    onDismiss={() => setAlert(null)}
                >
                    {alert.content}
                </Alert>
            )}

            <div style={{ marginTop: '20px', display: 'grid', gap: '20%' }}>
                <Input
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Nhập chữ abc, không tự ký đặc biệt"
                />
                <Input
                    value={password}
                    type="password"
                    onChange={handlePasswordChange}
                    placeholder="Nhập mật khẩu, không tự ký đặc biệt"
                />
                <Button onClick={validateInput}>Nhấn thử kiểm, báo error !@##$$%^^&*</Button>


            </div>
        </>
    );
}
