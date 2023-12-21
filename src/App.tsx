import { Avatar, Button, Spin, Table } from "antd";
import {
  useGetUsersQuery,
  useUpdateUsersMutation,
} from "./features/api/apiSlice";
import { IUsers } from "./types";
import { useMemo, useState } from "react";

function App() {
  const [userData, setUserData] = useState([]);
  const {
    data: users,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetUsersQuery("");

  const [updateUsers, { isSuccess: isUpdateSuccess, data: updatedUser }] =
    useUpdateUsersMutation();

  if (isUpdateSuccess) {
    alert(JSON.stringify(updatedUser));
  }

  const handleUpdate = () => {
    updateUsers({ id: "6", city: "Kayseri" });
  };

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

  console.log(memoizedUsers,"memoized");
  // console.log(memoizedUsers.sort((a,b)=>a.name),"memoized");

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
      sorter: (a: IUsers, b: IUsers) => a.name < b.name ? -1 : 1 ,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      sorter: (a: IUsers, b: IUsers) => a.name < b.name ? -1 : 1 ,
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      sorter: (a: IUsers, b: IUsers) => a.name < b.name ? -1 : 1 ,
    },
    {
      title: "Job",
      dataIndex: "job",
      key: "job",
      sorter: (a: IUsers, b: IUsers) => a.name < b.name ? -1 : 1 ,
    },
  ];

  return (
    <>
      <Button type="primary">Selam</Button>
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
      />
      ;
    </>
  );
}

export default App;
