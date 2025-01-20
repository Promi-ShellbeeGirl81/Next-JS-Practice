"use client";

import { useEffect, useState } from "react";
import UserButton from "@/components/user-button";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";

const Home = () => {
  const [tasks, setTasks] = useState([]); // Store all tasks in an array
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks/show"); // Endpoint to fetch all tasks
        const data = await response.json();
        if (response.ok) {
          setTasks(data); // Set the retrieved tasks
        } else {
          setError("Failed to fetch tasks"); // Handle fetch error
        }
      } catch (error) {
        setError("An unexpected error occurred.");
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false after the fetch is complete
      }
    };

    fetchTasks();
  }, []); // Only run once when the component mounts

  const handleDelete = async (id) => {
    const response = await fetch(`/api/task/${id}`, {
      method: "DELETE", // Ensure the backend handles DELETE method
    });
    if (response.ok) {
      setTasks(tasks.filter((task) => task._id !== id)); // Remove the task from state after deletion
      console.log("Task deleted successfully");
    } else {
      console.error("Failed to delete task");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <SessionProvider>
          <UserButton />
        </SessionProvider>
      </div>

      <main className="p-6 border-b flex flex-col justify-between">
        <div className="flex flex-col items-center mt-8">
          {loading ? (
            <div>Loading tasks...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            tasks.map((task) => (
              <div key={task._id} className="mb-4">
                <div className="font-bold">{task.title}</div>
                <div>{task.description}</div>
                <div className="flex gap-4 mt-4 justify-end">
                  <Link
                    className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest"
                    href={`/edit-task/${task._id}`} // Dynamic link to the edit task page
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(task._id)} // Pass task ID to delete
                    className="bg-red-500 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
