import { connectToDatabase } from "@/lib/mongodb";
import Task from "@/models/task";
import mongoose from "mongoose";
import { NextResponse } from "next/server";  // Importing NextResponse

export async function POST(req) {
    await connectToDatabase();
    const { title, description, completed } = await req.json(); 

    if (!title || !description) {
        // Return an error message for missing fields
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    try {
        const newTask = new Task({
            id: new mongoose.Types.ObjectId(),
            title,
            description,
            updatedAt: new Date(),
            createdAt: new Date(),
            completed: completed || false,
        });
        await newTask.save();
        return NextResponse.json({ message: "Task created successfully" }, { status: 201 });
    } catch (error) {
        // Log the error for debugging
        console.error("Error creating task:", error);
        return NextResponse.json(
            { message: "Something went wrong", error: error.message }, 
            { status: 500 }
        );
    }
}
