import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContactsAll, addContact, deleteContact } from './operations';

const STATUS = {
  PENDING: 'pending',
  REJECTED: 'rejected',
};

const arrThunks = [fetchContactsAll, addContact, deleteContact];
const fn = type => arrThunks.map(el => el[type]);

const handlePending = state => {
  state.isLoading = true;
};

const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};

const handleFulfilledGet = (state, action) => {
  handleFulfilled(state);
  state.value = action.payload;
};

const handleFulfilledAdd = (state, action) => {
  handleFulfilled(state);
  state.value.push(action.payload);
};

const handleFulfilledDel = (state, action) => {
  handleFulfilled(state);
  const index = state.value.findIndex(task => task.id === action.payload.id);
  state.value.splice(index, 1);
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    value: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    const { PENDING, REJECTED } = STATUS;
    builder
      .addCase(fetchContactsAll.fulfilled, handleFulfilledGet)
      .addCase(addContact.fulfilled, handleFulfilledAdd)
      .addCase(deleteContact.fulfilled, handleFulfilledDel)
      .addMatcher(isAnyOf(...fn(PENDING)), handlePending)
      .addMatcher(isAnyOf(...fn(REJECTED)), handleRejected);
  },
});

// Первое улучшение =================================
// export const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: {
//     value: [],
//     isLoading: false,
//     error: null,
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(fetchContactsAll.fulfilled, handleFulfilledGet)
//       .addCase(addContact.fulfilled, handleFulfilledAdd)
//       .addCase(deleteContact.fulfilled, handleFulfilledDel)
//       .addMatcher(
//         isAnyOf(
//           fetchContactsAll.pending,
//           addContact.pending,
//           deleteContact.pending
//         ),
//         handlePending
//       )
//       .addMatcher(
//         isAnyOf(
//           fetchContactsAll.rejected,
//           addContact.rejected,
//           deleteContact.rejected
//         ),
//         handleRejected
//       );
//   },
// });

// Начало ====================================
// export const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: {
//     value: [],
//     isLoading: false,
//     error: null,
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(fetchContactsAll.pending, handlePending)
//       .addCase(fetchContactsAll.fulfilled, handleFulfilledGet)
//       .addCase(fetchContactsAll.rejected, handleRejected)
//       .addCase(addContact.pending, handlePending)
//       .addCase(addContact.fulfilled, handleFulfilledAdd)
//       .addCase(addContact.rejected, handleRejected)
//       .addCase(deleteContact.pending, handlePending)
//       .addCase(deleteContact.fulfilled, handleFulfilledDel)
//       .addCase(deleteContact.rejected, handleRejected);
//   },
// });
