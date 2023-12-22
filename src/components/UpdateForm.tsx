import  { useEffect } from "react";
import { Button, Col, Form, Input, Layout, Row, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { FieldType, IUsers } from "../types";
import { useUpdateUsersMutation } from "../features/api/apiSlice";



const UpdateForm = () => {
  const { state: data } = useLocation();

  const navigate = useNavigate();

  const initialValues: FieldType = {
    name: data.name,
    city: data.city,
    country: data.country,
    job: data.job,
    createdAt: data.createdAt,
  };

  const [updateUsers, { isSuccess, isLoading }] = useUpdateUsersMutation();

  const onFinish = (values: IUsers) => {
    updateUsers({ ...values, id: data.key });
  };

  useEffect(() => {
    if (isSuccess) {
      sessionStorage.setItem("updateAlert", "true");
      navigate("/");
    }
  }, [isSuccess]);



  const { Title } = Typography;


  return (
    <Layout style={{height:"100vh"}}>

  
    <Row justify="center">
      <Col xs={{ span: 24 }} md={{ span: 24 }}>
      <Title style={{ textAlign: "center",marginBottom:25 }} level={2}>
        Update User
      </Title>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, margin:"auto" }}
          initialValues={initialValues}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="City"
            name="city"
            rules={[{ required: true, message: "Please input your city!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please input your country!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Job"
            name="job"
            rules={[{ required: true, message: "Please input your job!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Created At"
            name="createdAt"
            
          >
            <Input disabled />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button style={{marginRight:10}} danger onClick={()=>navigate("/")} >
              İptal Et
            </Button>
            <Button loading={isLoading} type="primary" htmlType="submit">
              Güncelle
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
    </Layout>
  );
};

export default UpdateForm;
