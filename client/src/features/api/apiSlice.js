import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//const url = 'https://project-finder-backend-production.up.railway.app'
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api', credentials: 'include' }),
  tagTypes: ['getProjects',],
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
      providesTags: ['']
    }),
    addProject: builder.mutation({
      query: project => ({
        url: '/projects',
        method: 'POST',
        body: project
      }),
      invalidatesTags: ['getProjects']
    }),
    
    
    getUser: builder.query({
      query: () => '/auth/user'
    }),
    getAllTeams: builder.query({
      query: () => '/teams'
    }),
    getTeam: builder.query({
      query: (teamId) => `teams/${teamId}`
    }),
    addTeam: builder.mutation({
      query: team => ({
        url: '/teams',
        method: 'POST',
        body: team
      }),
      invalidatesTags: ['getTeams']
    }),
  }),
});

export const { useGetAllProjectsQuery, useGetProjectQuery, useGetMembersQuery, useAddProjectMutation, useGetUserQuery, useGetAllTeamsQuery, useGetTeamQuery, useAddTeamMutation } = apiSlice;