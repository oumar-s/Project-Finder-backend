import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//const url = 'https://project-finder-backend-production.up.railway.app'
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api', credentials: 'include'}),
  tagTypes: ['otherRequest', 'myRequests', 'getProjects', 'Getmembers'],
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: () => '/projects',
      providesTags: ['getProjects']
    }),
    getProject: builder.query({
      query: (projectId) => `projects/${projectId}`
    }),
    getMembers: builder.query({
      query: (projectId) => `requests/members/${projectId}`,
      providesTags: ['Getmembers']
    }),
    addProject: builder.mutation({
        query: project => ({
            url: '/projects',
            method: 'POST',
            body: project
        }),
        invalidatesTags: ['getProjects']
    }),
    getMyRequests: builder.query({
      query: () => 'requests/myRequests',
      providesTags: ['myRequests']
    }),
    getOtherRequests: builder.query({
      query: () => 'requests/otherRequests',
      providesTags: ['otherRequest']
    }),
    getMyProjects: builder.query({
      query: () => 'requests/owner'
    }),
    getOtherProjects: builder.query({
      query: () => 'requests/member'
    }),
    approveOtherRequests: builder.mutation({
      query: (requestId) => ({
        url: `requests/approve/${requestId}`,
        method: 'POST',
        headers: {
        "Content-Type": "application/json"
        }
      }),
      invalidatesTags: ['otherRequest', 'Getmembers']
    }),
    denyOtherRequests: builder.mutation({
      query: (requestId) => ({
        url: `requests/disapprove/${requestId}`,
        method: 'POST',
        headers: {
        "Content-Type": "application/json"
        }
      }),
      invalidatesTags: ['otherRequest']
    }),

    addRequest: builder.mutation({
      query: (projectId) => ({
          url: `/requests/${projectId}`,
          method: 'POST',
				  headers: {
					"Content-Type": "application/json"
          }
      }),
      invalidatesTags: ['myRequests']
  }),
  getUser: builder.query({
    query: () => '/auth/user'
  }),

  }),
});

export const { useGetAllProjectsQuery, useGetProjectQuery, useGetMembersQuery, useAddProjectMutation, useAddRequestMutation, useGetMyRequestsQuery, useGetOtherRequestsQuery, useApproveOtherRequestsMutation, useDenyOtherRequestsMutation, useGetMyProjectsQuery, useGetOtherProjectsQuery, useGetUserQuery } = apiSlice;