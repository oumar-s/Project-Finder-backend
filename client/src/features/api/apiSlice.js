import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
//const url = 'https://project-finder-backend-production.up.railway.app'
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api', credentials: 'include' }),
  tagTypes: ['getProjects', 'getTeamRequests', 'getProjectTasks', 'myTasksInProject'],
  endpoints: (builder) => ({
    //User
    getUser: builder.query({
      query: () => '/auth/user'
    }),
    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: '/auth/user/update',
        method: 'PUT',
        body: data
      }) 
    }),
    updateEmail: builder.mutation({
      query: (data) => ({
        url: '/auth/update-email',
        method: 'PUT',
        body: data
      })
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: '/auth/update-password',
        method: 'PUT',
        body: data
      })
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
      query: (projectId) => `/projectMembers/members/${projectId}`,
      providesTags: []
    }),

    addUserToProject: builder.mutation({
      query: (data) => ({
        url: `/projectMembers/${data.projectId}/${data.userId}`,
        method: 'POST',
        body: {}
      }),
      invalidatesTags: []
    }),

    removeUserFromProject: builder.mutation({
      query: (memberId) => ({
        url: `/projectMembers/${memberId}`,
        method: 'DELETE',
        body: {}
      }),
      invalidatesTags: []
    }),

    //project requests
    getProjectRequests: builder.query({
      query: (projectId) => `/projectRequests/${projectId}`,
      providesTags: []
    }),

    addRequestToProject: builder.mutation({
      query: (projectId) => ({
        url: `/projectRequests/${projectId}`,
        method: 'POST',
        body: {}
      }),
      invalidatesTags: []
    }),

    changeProjectRequestStatus: builder.mutation({
      query: (data) => ({
        url: `/projectRequests/${data.requestId}`,
        method: 'PATCH',
        body: {status: data.status}
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
      query: (userId) => `/teamMembers/teams/${userId}`,
      providesTags: []
    }),

    addMemberToTeam: builder.mutation({
      query: (data) => ({
        url: `/teamMembers/${data.teamId}/${data.userId}`,
        method: 'POST',
        body: {}
      }),
      invalidatesTags: []
    }),

    removeMemberFromTeam: builder.mutation({
      query: (memberId) => ({
        url: `/teamMembers/${memberId}`,
        method: 'DELETE',
        body: {}
      }),
      invalidatesTags: []
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
      invalidatesTags: []
    }),

    changeTeamRequestStatus: builder.mutation({
      query: (data) => ({
        url: `/teamRequests/${data.requestId}`,
        method: 'PATCH',
        body: { status: data.status },
      }),
      invalidatesTags: ['getTeamRequests']
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
        return ['getProjectTasks', 'myTasksInProject'];
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
        return ['getProjectTasks', 'myTasksInProject'];
      }
    }),

    addTask: builder.mutation({
      query: (data) => ({
        url: `/tasks/${data.projectId}`,
        method: 'POST',
        body: data.task
      }),
      invalidatesTags: []
    }),

    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: 'DELETE',
        body: {}
      }),
      invalidatesTags: ['getProjectTasks']
    })
  }),
});

export const {
  useGetUserQuery,
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