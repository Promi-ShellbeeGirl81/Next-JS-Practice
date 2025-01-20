"use client";

import { useState } from 'react';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';  // Import from 'next/navigation' for Next.js 13+

export default function CreateTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [pending, setPending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPending(true);  // Set pending to true when the request starts
        setError(null);    // Clear previous errors
    
        try {
            const res = await fetch("/api/tasks/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, description }),
            });

            console.log('Response Status:', res.status);

            if (res.ok) {
                const task = await res.json();  // Parse JSON only if status is OK
                console.log('Response Body:', task);

                toast.success(task.message || "Task created successfully!");
                setError(task.message);
                redirect("/");  
            } else {
                // Handle error response from the server
                const task = await res.json();  // Parse error response
                setError(null);
                redirect("/");  
            }
        } catch (error) {
            console.error("Error during fetch request:", error);
            setError(null);
            redirect("/");  
        } finally {
            console.log("Resetting pending state...");
            setPending(false); // Always reset the pending state after the request is done
        }
    };

    return (
        <div className="p-5 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-5">Create Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-2.5">
                    <label className="block mb-1.25">Title</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className="w-full p-2 box-border border border-gray-300" 
                    />
                </div>
                <div className="mb-2.5">
                    <label className="block mb-1.25">Description</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        className="w-full p-2 box-border border border-gray-300" 
                    />
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error messages */}
                <button type="submit" className="mt-4 p-2 bg-blue-500 text-white" disabled={pending}>
                    {pending ? "Adding..." : "Add Task"}
                </button>
            </form>
        </div>
    );
}
