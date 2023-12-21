import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath:"api/v1",
    baseQuery:fetchBaseQuery({baseUrl:"https://658356724d1ee97c6bcdd974.mockapi.io/"}),
    endpoints:(builder)=>({
        getUsers:builder.query({
            query:()=>"/users"
        }),
        updateUsers:builder.mutation({
            query:(user)=>({
                url:`/users/${+user.id}`,
                method:"PUT",
                body:user
            })
        })
    })
})  

export const {useGetUsersQuery,useUpdateUsersMutation} = apiSlice