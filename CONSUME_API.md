# How to Consume the API on the Frontend

This document provides a step-by-step guide to consuming the API endpoints provided by the backend in your frontend application.

---

## Prerequisites

1. **Install Required Libraries**:
   Ensure you have the following libraries installed in your frontend project:
   ```bash
   npm install axios react-query
   ```

2. **Base API URL**:
   Set the base URL for your API in a configuration file or environment variable. For example:
   ```javascript
   const BASE_URL = 'http://localhost:3000'; // Replace with your API URL
   ```

---

## Step 1: Create an Axios Instance

Create a reusable Axios instance to handle API requests.

```javascript
// filepath: /home/sarthaksanghavi/Desktop/codex/conference-booking/web/src/lib/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your API base URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
```

---

## Step 2: Set Up React Query

Wrap your application with the `QueryClientProvider` to enable React Query.

```javascript
// filepath: /home/sarthaksanghavi/Desktop/codex/conference-booking/web/src/app/layout.tsx
import { QueryClient, QueryClientProvider } from 'react-query';
import axiosInstance from '../lib/axios';

const queryClient = new QueryClient();

function AppLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default AppLayout;
```

---

## Step 3: Create API Hooks

Use `react-query` to create reusable hooks for API calls.

### Example: Fetch All Bookings

```javascript
// filepath: /home/sarthaksanghavi/Desktop/codex/conference-booking/web/src/hooks/useBookings.ts
import { useQuery } from 'react-query';
import axiosInstance from '../lib/axios';

export const useBookings = () => {
  return useQuery('bookings', async () => {
    const { data } = await axiosInstance.get('/bookings');
    return data;
  });
};
```

### Example: Create a Booking

```javascript
// filepath: /home/sarthaksanghavi/Desktop/codex/conference-booking/web/src/hooks/useCreateBooking.ts
import { useMutation, useQueryClient } from 'react-query';
import axiosInstance from '../lib/axios';

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newBooking) => {
      const { data } = await axiosInstance.post('/bookings', newBooking);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('bookings'); // Refresh bookings list
      },
    }
  );
};
```

---

## Step 4: Use Hooks in Components

### Fetch and Display Bookings

```javascript
// filepath: /home/sarthaksanghavi/Desktop/codex/conference-booking/web/src/components/BookingsList.tsx
import React from 'react';
import { useBookings } from '../hooks/useBookings';

const BookingsList = () => {
  const { data: bookings, isLoading, error } = useBookings();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading bookings</p>;

  return (
    <ul>
      {bookings.map((booking) => (
        <li key={booking.id}>
          {booking.name} - {booking.description}
        </li>
      ))}
    </ul>
  );
};

export default BookingsList;
```

### Create a New Booking

```javascript
// filepath: /home/sarthaksanghavi/Desktop/codex/conference-booking/web/src/components/CreateBookingForm.tsx
import React, { useState } from 'react';
import { useCreateBooking } from '../hooks/useCreateBooking';

const CreateBookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    conferenceRoomId: '',
  });

  const createBooking = useCreateBooking();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createBooking.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleChange}
      />
      <input
        type="text"
        name="conferenceRoomId"
        placeholder="Conference Room ID"
        value={formData.conferenceRoomId}
        onChange={handleChange}
      />
      <button type="submit">Create Booking</button>
    </form>
  );
};

export default CreateBookingForm;
```

---

## Step 5: Authentication (Optional)

If your API requires authentication, include a token in the Axios headers.

### Add Token to Axios

```javascript
// filepath: /home/sarthaksanghavi/Desktop/codex/conference-booking/web/src/lib/axios.ts
import axios from 'axios';

const token = localStorage.getItem('token'); // Retrieve token from localStorage

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`, // Add token to headers
  },
});

export default axiosInstance;
```

---

## Step 6: Error Handling

Handle errors globally using Axios interceptors.

```javascript
// filepath: /home/sarthaksanghavi/Desktop/codex/conference-booking/web/src/lib/axios.ts
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
```

---

## Step 7: Implement Login API

### Create a Login Hook

Use `react-query` to create a reusable hook for the login API.

```javascript
// filepath: /home/sarthaksanghavi/Desktop/codex/conference-booking/web/src/hooks/useLogin.ts
import { useMutation } from 'react-query';
import axiosInstance from '../lib/axios';

export const useLogin = () => {
  return useMutation(async (credentials) => {
    const { data } = await axiosInstance.post('/login', credentials);
    return data;
  });
};
```

---

### Update Login Component

Modify the login component to use the `useLogin` hook and redirect to the home page upon successful login.

```tsx
// filepath: /home/sarthaksanghavi/Desktop/codex/conference-booking/web/src/app/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const router = useRouter();
  const login = useLogin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate(credentials, {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token); // Save token
        localStorage.setItem("user", JSON.stringify(data.user)); // Save user info
        router.push("/home"); // Redirect to home page
      },
      onError: (error) => {
        console.error("Login failed:", error);
        alert("Invalid username or password");
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      ...existing code...
    </div>
  );
}
```

---

### Create Home Page Component

Create a new home page component to display the user's name and role.

```tsx
// filepath: /home/sarthaksanghavi/Desktop/codex/conference-booking/web/src/app/home/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push("/"); // Redirect to login if no user data
    }
  }, [router]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome, {user.name}!</h1>
        <p className="text-gray-600">Role: {user.role}</p>
      </div>
    </div>
  );
}
```

---

## Step 8: Add Login API Endpoint

Ensure your backend has a `/login` endpoint that returns a token and user details (e.g., name and role) upon successful authentication.

Example response:
```json
{
  "token": "your-jwt-token",
  "user": {
    "name": "John Doe",
    "role": "Admin"
  }
}
```

---

## Conclusion

You can now log in using the `Login` component, redirect to the home page, and display the user's name and role. Customize the components and hooks as needed for your application.
