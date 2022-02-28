import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    agendaId: null,
    agendaName: null,
    topicId: null,
    topicName: null,
    topicDesc: null,
    topicEta: null
  },
  reducers: {
    setAgendaInfo: (state, action) => {
      state.agendaId = action.payload.agendaId;
      state.agendaName = action.payload.agendaName;
    },
    setTopicInfo: (state, action) => {
      state.topicId = action.payload.topicId;
      state.topicName = action.payload.topicName;
      state.topicDesc = action.payload.topicDesc;
      state.topicEta = action.payload.topicEta;
    },
  },
});

export const { setAgendaInfo, setTopicInfo } = appSlice.actions;
export const selectAgendaId = (state) => state.app.agendaId;
export const selectAgendaName = (state) => state.app.agendaName;
export const selectTopicId = (state) => state.app.topicId;
export const selectTopicName = (state) => state.app.topicName;
export const selectTopicDesc = (state) => state.app.topicDesc;
export const selectTopicEta = (state) => state.app.topicEta;
export default appSlice.reducer;
