import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home, Login, Signup, AddPost, EditPost, Post, AllPost } from './pages/index.js'
import { AuthLayout } from './components/index.js'

// Define routes using createBrowserRouter, associating paths with components
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: (
          // AuthLayout to check authentication state
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: "/all-post",
        element: (
          // Protected route to view all posts, requires authentication
          <AuthLayout authentication>
            <AllPost />
          </AuthLayout>
        )
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        )
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
    ]
  },
])

// Render the application, wrapping it in StrictMode for additional checks, and Redux Provider for state management
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* Provide routing functionality to the app */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
