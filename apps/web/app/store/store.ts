import { configureStore } from '@reduxjs/toolkit'
import { dummyReducer } from '~/store/features/dummy-reducer'

export const store = configureStore({
  reducer: {
    dummy: dummyReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
