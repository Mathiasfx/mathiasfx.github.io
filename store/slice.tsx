import { Work } from "@/app/interfaces/work.interface";
import { createSlice } from "@reduxjs/toolkit";

export const Slice = createSlice({
  name: "projects",
  initialState: {
    projects: [] as Work[],
  },
  reducers: {
    addProject: (state, action: { payload: Work }) => {
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
