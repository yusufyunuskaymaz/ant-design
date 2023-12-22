import {
  Avatar,
  Button,
  Card,
  Col,
  Flex,
  Modal,
  Row,
  Spin,
  Table,
  Typography,
} from "antd";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../features/api/apiSlice";
import { IUsers } from "../types";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Search from "antd/es/input/Search";

function UserTable() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteUserID = useRef("");

  const [deleteUser, { isSuccess: deleteIsSuccess }] = useDeleteUserMutation();

  useEffect(() => {
    if (deleteIsSuccess) {
      notifySuccess("Silme İşlemi Başarılı");
    }
  }, [deleteIsSuccess]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    deleteUser(deleteUserID.current);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const {
    data: users,
    isLoading,
    // isError,
    // error,
    // isSuccess,
  } = useGetUsersQuery("");

  const memoizedUsers = useMemo(() => {
    return users?.map((item: IUsers) => ({
      key: item.id,
      name: item.name,
      avatar: item.avatar,
      city: item.city,
      country: item.country,
      job: item.job,
      createdAt: item.createdAt,
    }));
  }, [users]);

  const handleDelete = (userId: string) => {
    deleteUserID.current = userId;
    showModal();
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (data: string) => <Avatar src={data} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: IUsers, b: IUsers) => (a.name < b.name ? -1 : 1),
    },

    {
      title: "City",
      dataIndex: "city",
      key: "city",
      sorter: (a: IUsers, b: IUsers) => (a.city < b.city ? -1 : 1),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      sorter: (a: IUsers, b: IUsers) => (a.country < b.country ? -1 : 1),
    },
    {
      title: "Job",
      dataIndex: "job",
      key: "job",
      sorter: (a: IUsers, b: IUsers) => (a.job < b.job ? -1 : 1),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => (
        <div>{new Date(date).toLocaleDateString()}</div>
      ),
    },
    {
      title: "",
      dataIndex: "editDelete",
      key: "editDelete",
      render: (text: string, record: IUsers) => (
        <Flex gap={5}>
          <Button
            type="primary"
            onClick={() => navigate("update", { state: record })}
          >
            Düzenle
          </Button>{" "}

          <Button danger onClick={() => handleDelete(record.key)}>
            Sil
          </Button>
        </Flex>
      ),
    },
  ];

  const notifySuccess = (message: string) => toast.success(message);

  useEffect(() => {
    const alert = sessionStorage.getItem("updateAlert");
    if (alert === "true") {
      notifySuccess("Başarıyla Güncellendi");
      sessionStorage.setItem("updateAlert", "false");
    }
  }, []);

  const { Title } = Typography;

  const [filteredUsers, setFilteredUsers] = useState<IUsers[] | null>(null);

  const searchData = (value: string) => {
    const filteredData = users
      .filter((item: IUsers) =>
        JSON.stringify(item).toLowerCase().includes(value.toLowerCase())
      )
      .map((item: IUsers) => ({ ...item, key: item.id }));

    setFilteredUsers(filteredData);
  };

  return (
    <Card style={{ padding: 0 }}>
      <Title style={{ textAlign: "center", margin: "1.5rem 0" }} level={2}>
        Users Table
      </Title>
      <Flex justify="end">
        <Search
          placeholder="Bir şeyler arayın..."
          allowClear
          size="large"
          onChange={(e) => searchData(e.target.value)}
          style={{ width: "300px", marginBottom: ".5rem" }}
        />
      </Flex>
      <Row>
        <Col  xs={24}>
          <Table
            dataSource={filteredUsers ?? memoizedUsers}
            columns={columns}
            pagination={{ pageSize: 5 }}
            loading={{
              indicator: (
                <div>
                  <Spin />
                </div>
              ),
              spinning: isLoading,
            }}
            style={{width:"100%"}}
          />
          <Toaster />
          <Modal
            title="Silmek İstediğinizden Emin misiniz?"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          ></Modal>
        </Col>
      </Row>
    </Card>
  );
}

export default UserTable;
