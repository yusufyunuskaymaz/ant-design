import { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Flex,
  Form,
  Input,
  Layout,
  Row,
  Typography,
} from "antd";
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
    <Layout style={{ height: "100vh" }}>
      <Card style={{ margin: 20 }}>
        <Title
          style={{ textAlign: "center", margin: "1rem 0 2rem 0" }}
          level={2}
        >
          Update User
        </Title>
        <Row justify="center">
          <Col xs={24} md={16}>
            <Form
              name="basic"
              labelCol={{ xs: 24, md: 8 }}
              wrapperCol={{ xs: 24, md: 16 }}
              style={{
                width: "60%",
                margin: "auto",
              }}
              initialValues={initialValues}
              onFinish={onFinish}
              autoComplete="off"
              className="userForm"
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
                rules={[
                  { required: true, message: "Please input your country!" },
                ]}
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
              <Form.Item label="Created At">
                <Input
                  disabled
                  defaultValue={new Date(data.createdAt).toLocaleString()}
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Flex gap={5}>
                  <Button
                    style={{ marginRight: 10 }}
                    
                    onClick={() => navigate("/")}
                  >
                    İptal Et
                  </Button>
                  <Button loading={isLoading} type="primary" htmlType="submit">
                    Güncelle
                  </Button>
                </Flex>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>
    </Layout>
  );
};

export default UpdateForm;
