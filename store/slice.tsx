import { createSlice } from "@reduxjs/toolkit";

export interface Project {
  id: number;
  name: string;
  description: string;
}

export const Slice = createSlice({
  name: "projects",
  initialState: {
    projects: [] as Project[],
  },
  reducers: {
    addProject: (state, action: { payload: Project }) => {
      // Modificar el estado directamente
      state.projects.push(action.payload);
    },
    removeProject: (state, action: { payload: number }) => {
      // Filtrar el proyecto directamente
      state.projects = state.projects.filter(
        (_, index) => index !== action.payload
      );
    },
  },
});

export const { addProject, removeProject } = Slice.actions;
