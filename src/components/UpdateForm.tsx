import React, { useEffect, useState } from "react";
import { Button, Checkbox, Col, Flex, Form, Input, Row,notification } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { IUsers } from "../types";
import { useUpdateUsersMutation } from "../features/api/apiSlice";
import NotifyUser from "./NotifyUser";

type FieldType = {
  name: string;
  city: string;
  country: string;
  job: string;
  createdAt: string;
};

const UpdateForm = () => {
  const { state: data } = useLocation();

  const [api, contextHolder] = notification.useNotification();


  const navigate = useNavigate()

  const initialValues: FieldType = {
    name: data.name,
    city: data.city,
    country: data.country,
    job: data.job,
    createdAt: data.createdAt,
  };

  const [updateUsers, {  isSuccess, isLoading }] = useUpdateUsersMutation();

  const onFinish = (values: IUsers) => {
    updateUsers({ ...values, id: data.key })
  };

  useEffect(() => {
    if (isSuccess) {
      sessionStorage.setItem("updateAlert","true")
      navigate("/")
    }
  }, [isSuccess,navigate]);


  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Row justify="center">
      <Col span={24}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, margin: "auto" }}
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
            rules={[
              { required: true, message: "Please input your createdAt!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button loading={isLoading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
      {contextHolder}
    </Row>
  );
};

export default UpdateForm;
