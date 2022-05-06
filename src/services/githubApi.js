import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseUrl="https://api.github.com/"
export const githubApi=createApi({
    reducerPath:'githubApi',
    baseQuery:fetchBaseQuery({baseUrl:baseUrl}),
    endpoints: (builder)=>({
        getUser:builder.query({
            query:(uid)=>`user/${uid}`,
        }),
        getRepos:builder.query({
            query:(uid)=>`user/${uid}/repos`,
        }),
        getReposWname:builder.query({
            query:(name)=>`users/${name}`,
        }),
    })   
})
export const {useGetReposQuery,useGetReposWnameQuery}=githubApi
