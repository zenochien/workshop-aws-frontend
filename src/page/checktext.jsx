import React, { useEffect, useState } from 'react';
import { Container, Header, Alert, Button, Input } from '@cloudscape-design/components';

export default function CheckText({ setContentHeader }) {
  useEffect(() => {
    setContentHeader(<Header variant="h1">Kiểm tra text</Header>);
  }, [setContentHeader]);

  const [alert, setAlert] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.detail.value);
  };

  const validateInput = () => {
    const specialCharPattern = /[!@#$%&^*]/;
    if (specialCharPattern.test(inputValue)) {
      showErrorAlert();
    } else {
      showSuccessAlert();
    }
  };

  const showSuccessAlert = () => {
    setAlert({
      type: 'success',
      header: 'Thành công',
      content: 'Bạn đã nhập đúng',
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
      <div style={{ marginTop: "20px" }}>
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
      </div>


      <div style={{ marginTop: '20px', display: 'grid', gap: '20%' }}>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Nhập chữ abc, không tự ký đặc biệt"
        />
        <Button onClick={validateInput}>Kiểm tra và báo lỗi !@#$%&^*</Button>


      </div>
    </>
  );
}
