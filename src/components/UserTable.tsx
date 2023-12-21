import { Avatar, Button, Spin, Table } from "antd";
import { useGetUsersQuery } from "../features/api/apiSlice";
import { IUsers } from "../types";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';


function UserTable() {
  const navigate = useNavigate();


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

  const columns = [
    {
      title: "",
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
      sorter: (a:IUsers, b:IUsers) => (a.city < b.city ? -1 : 1),
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
    },
  ];

  const notifySuccess = (message:string) => toast.success(message);


  useEffect(() => {
   const alert =  sessionStorage.getItem("updateAlert")
   if(alert === "true"){
    notifySuccess("Başarıyla Güncellendi")
    sessionStorage.setItem("updateAlert","false")
   }
  }, [])
  

  return (
    <>
      <Button
        type="primary"
      >
        Selam
      </Button>
      <Table
        dataSource={memoizedUsers}
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
        onRow={(record: IUsers) => {
          return {
            onClick: () => navigate("update", { state: record }),
          };
        }}
      />
      <Toaster />
    </>
  );
}

export default UserTable;
