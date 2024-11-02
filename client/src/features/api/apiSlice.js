import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//const url = 'https://project-finder-backend-production.up.railway.app'
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api', credentials: 'include' }),
  tagTypes: ['getProjects',],
  endpoints: (builder) => ({
    //User
    getUser: builder.query({
      query: () => '/auth/user'
    }),

    //Project
    getAllProjects: builder.query({
      query: () => '/projects',
      providesTags: ['getProjects']
    }),

    getProject: builder.query({
      query: (projectId) => `/projects/${projectId}`
    }),

    addProject: builder.mutation({
      query: (arg) => ({
        url: `/projects/${arg.teamId}`,
        method: 'POST',
        body: arg.project
      }),
      invalidatesTags: ['getProjects']
    }),
    
    getProjectsForTeam: builder.query({
      query: (teamId) => `/projects/teams/${teamId}`
    }),

    getUserProjectsInTeam: builder.query({
      query: (params) => `/projects/${params.teamId}/${params.userId}`
    }),
    
    //project members
    getAllProjectsForUser: builder.query({
      query: (userId) => `/projectMembers/${userId}`,
      providesTags: []
    }),

    getProjectMembers: builder.query({
      query: (projectId) => `/projectMembers/${projectId}`,
      providesTags: []
    }),

    addUserToProject: builder.mutation({
      query: (data, projectId, userId) => ({
        url: `/projectMembers/${projectId}/${userId}`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: []
    }),

    //project requests
    getProjectRequests: builder.query({
      query: (projectId) => `/requests/${projectId}`,
      providesTags: []
    }),

    addRequestToProject: builder.mutation({
      query: (data, projectId) => ({
        url: `/projectRequests/${projectId}`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: []
    }),

    //teams
    getAllTeams: builder.query({
      query: () => '/teams',
      providesTags: []
    }),
    
    getTeam: builder.query({
      query: (teamId) => `/teams/${teamId}`,
      providesTags: []
    }),

    addTeam: builder.mutation({
      query: team => ({
        url: '/teams',
        method: 'POST',
        body: team
      }),
      invalidatesTags: []
    }),

    //team members
    getTeamMembers: builder.query({
      query: (teamId) => `/teamMembers/${teamId}`,
      providesTags: []
    }),

    getUserTeams: builder.query({
      query: (userId) => `/teamMembers/${userId}`,
      providesTags: []
    }),

    addMemberToTeam: builder.mutation({
      query: (data, teamId, userId) => ({
        url: `/teamMembers/${teamId}/${userId}`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: []
    }),

    //team requests
    getTeamRequests: builder.query({
      query: (teamId) => `/teamRequests/${teamId}`,
      providesTags: []
    }),

    addRequestToTeam: builder.mutation({
      query: (data, teamId) => ({
        url: `/teamRequests/${teamId}`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: []
    }),

    //tasks
    getTasksForUser: builder.query({
      query: (userId) => `/tasks/user/${userId}`,
      providesTags: []
    }),

    getIncompleteTasksForUser: builder.query({
      query: (userId) => `/tasks/incomplete/${userId}`,
      providesTags: []
    }),

    getProjectTasksAssignedToUser: builder.query({
      query: (params) => `/tasks/${params.projectId}/${params.userId}`,
      providesTags: []
    }),

    getProjectTasks: builder.query({
      query: (projectId) => `/tasks/${projectId}`,
      providesTags: []
    }),

    assignTask: builder.mutation({
      query: (taskId, userId) => ({
        url: `/tasks/${taskId}/${userId}`,
        method: 'PUT',
        body: {}
      }),
      invalidatesTags: []
    }),

    changeTaskStatus: builder.mutation({
      query: (data, taskId) => ({
        url: `/tasks/${taskId}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: []
    }),

    addTask: builder.mutation({
      query: (data) => ({
        url: `/tasks/${data.projectId}`,
        method: 'POST',
        body: data.task
      }),
      invalidatesTags: []
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAllProjectsQuery,
  useGetProjectQuery,
  useAddProjectMutation,
  useGetProjectsForTeamQuery,
  useGetUserProjectsInTeamQuery,
  useGetAllProjectsForUserQuery,
  useGetProjectMembersQuery,
  useAddUserToProjectMutation,
  useGetProjectRequestsQuery,
  useAddRequestToProjectMutation,
  useGetAllTeamsQuery,
  useGetTeamQuery,
  useAddTeamMutation,
  useGetTeamMembersQuery,
  useGetUserTeamsQuery,
  useAddMemberToTeamMutation,
  useGetTeamRequestsQuery,
  useAddRequestToTeamMutation,
  useGetTasksForUserQuery,
  useGetIncompleteTasksForUserQuery,
  useGetProjectTasksAssignedToUserQuery,
  useGetProjectTasksQuery,
  useAssignTaskMutation,
  useChangeTaskStatusMutation,
  useAddTaskMutation
} = apiSlice;