import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath:"api/v1",
    baseQuery:fetchBaseQuery({baseUrl:"https://658356724d1ee97c6bcdd974.mockapi.io/"}),

    // Navigate yaptıktan sonra tabloda güncel verinin gözükmesi için değişim varsa auto-fetching yapıyor
    tagTypes:['Users'],
    endpoints:(builder)=>({
        getUsers:builder.query({
            query:()=>"/users",
            providesTags:["Users"]
        }),
        updateUsers:builder.mutation({
            query:(user)=>({
                url:`/users/${+user.id}`,

                // Normalde PATCH kullanacaktım ama api PATHC e izin vermiyor
                method:"PUT",
                body:user
            }),
            invalidatesTags:["Users"]
        })
    })
})  

export const {useGetUsersQuery,useUpdateUsersMutation} = apiSlice