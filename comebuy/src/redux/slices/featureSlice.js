import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import FeatureAPI from "../../api/featureAPI";

export const getAll = createAsyncThunk(
  'feature/getAll',
  // Code async logic, tham số đầu tiên data là dữ liệu truyền vào khi gọi action
  async (data, { rejectWithValue }) => {
    const response = await FeatureAPI.getAll()
    if (!response) {
      return rejectWithValue("Get All Failed");
    }
    else {
      return response;
    }
  }
);

export const editFeature = createAsyncThunk(
  'feature/edit',
  // Code async logic, tham số đầu tiên data là dữ liệu truyền vào khi gọi action
  async (data, { rejectWithValue }) => {
    const response = await FeatureAPI.edit(data)
    if (response.status != 200 && response != "Feature was updated successfully.") {
      return rejectWithValue("Get All Failed");
    }
    else {
      return data;
    }
  }
);

export const FeatureSlice = createSlice({
  name: 'Feature',
  initialState: {
    featureList: [],
    loading: false
  },
  reducers: {
    FeatureListChange: (state, action) => {
      state.FeatureList = action.payload;
    },
    FeatureLoadingChange: (state, action) => {
      state.loading = action.payload;
    },
    addFeature: (state, action) => {
      state.FeatureList.push(action.payload)
    }

  },
  extraReducers: {
    [getAll.pending]: (state) => {
      state.loading = true;
    },
    [getAll.fulfilled]: (state, action) => {
      state.loading = false;
      state.FeatureList = action.payload;
    },
    [getAll.rejected]: (state, action) => {
      state.loading = false;
    },
    [editFeature.pending]: (state) => {
      /// Nothing
    },
    [editFeature.fulfilled]: (state, action) => {
      state.FeatureList = state.FeatureList.map(member => {
        if (member.featureID == action.payload.featureID)
          return action.payload
        else return member
      });
    },
    [editFeature.rejected]: (state, action) => {
      state.loading = false;
    }
  }
})