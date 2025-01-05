import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api', credentials: 'include' }),
  tagTypes: ['getProjects', 'getTeamRequests', 'getProjectTasks', 'myTasksInProject', 'getUser', 'getUserById', 'getProjectRequests', 'getProjectMembers', 'getProject', 'getProjectsForTeam', 'getUserProjectsInTeam', 'getAllProjectsForUser', 'getAllTeams', 'getTeam', 'getTeamMembers', 'getUserTeams', 'getTasksForUser', 'getIncompleteTasksForUser'],
  endpoints: (builder) => ({
    //User
    getUser: builder.query({
      query: () => '/auth/user',
      providesTags: ['getUser']
    }),
    getUserById: builder.query({
      query: (userId) => `auth/user/${userId}`,
      providesTags: ['getUserById']
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: '/auth/user/update',
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['getUser', 'getUserById', 'getTeamMembers', 'getProjectMembers']
    }),
    updateEmail: builder.mutation({
      query: (data) => ({
        url: '/auth/update-email',
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['getUser', 'getUserById', 'getTeamMembers', 'getProjectMembers']
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: '/auth/update-password',
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['getUser', 'getUserById', 'getTeamMembers', 'getProjectMembers']
    }),

    //Project
    getAllProjects: builder.query({
      query: () => '/projects',
      providesTags: ['getProjects']
    }),

    getProject: builder.query({
      query: (projectId) => `/projects/${projectId}`,
      providesTags: ['getProject']
    }),

    addProject: builder.mutation({
      query: (arg) => ({
        url: `/projects/${arg.teamId}`,
        method: 'POST',
        body: arg.project
      }),
      invalidatesTags: ['getProjects', 'getProject', 'getProjectsForTeam','getUserProjectsInTeam' , 'getAllProjectsForUser', 'getProjectMembers']
    }),
    
    getProjectsForTeam: builder.query({
      query: (teamId) => `/projects/teams/${teamId}`,
      providesTags: ['getProjectsForTeam']
    }),

    getUserProjectsInTeam: builder.query({
      query: (params) => `/projects/${params.teamId}/${params.userId}`,
      providesTags: ['getUserProjectsInTeam']
    }),
    
    //project members
    getAllProjectsForUser: builder.query({
      query: (userId) => `/projectMembers/${userId}`,
      providesTags: ['getAllProjectsForUser']
    }),

    getProjectMembers: builder.query({
      query: (projectId) => `/projectMembers/members/${projectId}`,
      providesTags: ['getProjectMembers']
    }),

    addUserToProject: builder.mutation({
      query: (data) => ({
        url: `/projectMembers/${data.projectId}/${data.userId}`,
        method: 'POST',
        body: {}
      }),
      invalidatesTags: ['getProjectMembers', 'getAllProjectsForUser', 'getUserProjectsInTeam']
    }),

    removeUserFromProject: builder.mutation({
      query: (memberId) => ({
        url: `/projectMembers/${memberId}`,
        method: 'DELETE',
        body: {}
      }),
      invalidatesTags: ['getProjectMembers', 'getProjects', 'getProject', 'getProjectsForTeam','getUserProjectsInTeam' , 'getAllProjectsForUser', 'getUserProjectsInTeam']
    }),

    //project requests
    getProjectRequests: builder.query({
      query: (projectId) => `/projectRequests/${projectId}`,
      providesTags: ['getProjectRequests']
    }),

    addRequestToProject: builder.mutation({
      query: (projectId) => ({
        url: `/projectRequests/${projectId}`,
        method: 'POST',
        body: {}
      }),
      invalidatesTags: ['getProjectRequests']
    }),

    changeProjectRequestStatus: builder.mutation({
      query: (data) => ({
        url: `/projectRequests/${data.requestId}`,
        method: 'PUT',
        body: {status: data.status}
      }),
      invalidatesTags: ['getProjectRequests']
    }),

    //teams
    getAllTeams: builder.query({
      query: () => '/teams',
      providesTags: ['getAllTeams']
    }),
    
    getTeam: builder.query({
      query: (teamId) => `/teams/${teamId}`,
      providesTags: ['getTeam']
    }),

    addTeam: builder.mutation({
      query: team => ({
        url: '/teams',
        method: 'POST',
        body: team
      }),
      invalidatesTags: ['getAllTeams', 'getTeam', 'getUserTeams', 'getTeamMembers']
    }),

    //team members
    getTeamMembers: builder.query({
      query: (teamId) => `/teamMembers/${teamId}`,
      providesTags: ['getTeamMembers']
    }),

    getUserTeams: builder.query({
      query: (userId) => `/teamMembers/teams/${userId}`,
      providesTags: ['getUserTeams']
    }),

    addMemberToTeam: builder.mutation({
      query: (data) => ({
        url: `/teamMembers/${data.teamId}/${data.userId}`,
        method: 'POST',
        body: {}
      }),
      invalidatesTags: ['getTeamMembers']
    }),

    removeMemberFromTeam: builder.mutation({
      query: (memberId) => ({
        url: `/teamMembers/${memberId}`,
        method: 'DELETE',
        body: {}
      }),
      invalidatesTags: ['getTeamMembers', 'getAllTeams', 'getTeam', 'getUserTeams']
    }),

    //team requests
    getTeamRequests: builder.query({
      query: (teamId) => `/teamRequests/${teamId}`,
      providesTags: ['getTeamRequests']
    }),

    addRequestToTeam: builder.mutation({
      query: (teamId) => ({
        url: `/teamRequests/${teamId}`,
        method: 'POST',
        body: {}
      }),
      invalidatesTags: ['getTeamRequests']
    }),

    changeTeamRequestStatus: builder.mutation({
      query: (data) => ({
        url: `/teamRequests/${data.requestId}`,
        method: 'PUT',
        body: { status: data.status },
      }),
      invalidatesTags: ['getTeamRequests']
    }),
    

    //tasks
    getTasksForUser: builder.query({
      query: (userId) => `/tasks/user/${userId}`,
      providesTags: ['getTasksForUser']
    }),

    getIncompleteTasksForUser: builder.query({
      query: (userId) => `/tasks/incomplete/${userId}`,
      providesTags: ['getIncompleteTasksForUser']
    }),

    getProjectTasksAssignedToUser: builder.query({
      query: (params) => `/tasks/${params.projectId}/${params.userId}`,
      providesTags: ['myTasksInProject']
    }),

    getProjectTasks: builder.query({
      query: (projectId) => `/tasks/${projectId}`,
      providesTags: ['getProjectTasks']
    }),

    assignTask: builder.mutation({
      query: (data) => ({
        url: `/tasks/${data.taskId}/${data.userId}`,
        method: 'PUT',
        body: {}
      }),
      invalidatesTags: (result, error, arg) => {
        console.log('Invalidation Args:', arg);
        return ['getProjectTasks', 'myTasksInProject', 'getTasksForUser', 'getIncompleteTasksForUser'];
      }
    }),

    changeTaskStatus: builder.mutation({
      query: (data) => ({
        url: `/tasks/${data.taskId}`,
        method: 'PUT',
        body: data.body
      }),
      invalidatesTags: (result, error, arg) => {
        console.log('Invalidation Args:', arg);
        return ['getProjectTasks', 'myTasksInProject', 'getTasksForUser', 'getIncompleteTasksForUser'];
      }
    }),

    addTask: builder.mutation({
      query: (data) => ({
        url: `/tasks/${data.projectId}`,
        method: 'POST',
        body: data.task
      }),
      invalidatesTags: ['getProjectTasks', 'myTasksInProject', 'getTasksForUser', 'getIncompleteTasksForUser']
    }),

    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: 'DELETE',
        body: {}
      }),
      invalidatesTags: ['getProjectTasks', 'myTasksInProject', 'getTasksForUser', 'getIncompleteTasksForUser']
    })
  }),
});

export const {
  useGetUserQuery,
  useGetUserByIdQuery,
  useUpdateUserProfileMutation,
  useUpdateEmailMutation,
  useUpdatePasswordMutation,
  useGetAllProjectsQuery,
  useGetProjectQuery,
  useAddProjectMutation,
  useGetProjectsForTeamQuery,
  useGetUserProjectsInTeamQuery,
  useGetAllProjectsForUserQuery,
  useGetProjectMembersQuery,
  useAddUserToProjectMutation,
  useRemoveUserFromProjectMutation,
  useGetProjectRequestsQuery,
  useChangeProjectRequestStatusMutation,
  useAddRequestToProjectMutation,
  useGetAllTeamsQuery,
  useGetTeamQuery,
  useAddTeamMutation,
  useGetTeamMembersQuery,
  useGetUserTeamsQuery,
  useAddMemberToTeamMutation,
  useRemoveMemberFromTeamMutation,
  useGetTeamRequestsQuery,
  useChangeTeamRequestStatusMutation,
  useAddRequestToTeamMutation,
  useGetTasksForUserQuery,
  useGetIncompleteTasksForUserQuery,
  useGetProjectTasksAssignedToUserQuery,
  useGetProjectTasksQuery,
  useAssignTaskMutation,
  useChangeTaskStatusMutation,
  useAddTaskMutation,
  useDeleteTaskMutation
} = apiSlice;