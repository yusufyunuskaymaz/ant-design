import {
  useGetUsersQuery,
  useUpdateUsersMutation,
} from "./features/api/apiSlice";
import { IUsers } from "./types";

function App() {
  const {
    data: users,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetUsersQuery("");
  const [updateUsers, {isSuccess:isUpdateSuccess,data:updatedUser}] = useUpdateUsersMutation();

  if(isUpdateSuccess){
    alert(JSON.stringify(updatedUser))
  }

  
  const handleUpdate = () => {
    updateUsers({ "id": "6", "city": "Kayseri" });
  };

  let content;

  if (isLoading) {
    content = <p>Loading....</p>;
  } else if (isSuccess) {
    content = users.map((item:IUsers) => <p key={item.id}>{item.name}</p>);
  } else if (isError) {
    content = `<p>${error}</p>`;
  }

  return (
    <>
      <button onClick={handleUpdate}>deneme</button>
      {content}
    </>
  );
}

export default App;
