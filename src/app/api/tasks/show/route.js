import { NextResponse } from "next/server";
import Task from "@/models/task";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(req) {
    await connectToDatabase();
    try {
        const tasks = await Task.find({});
        return NextResponse.json(tasks, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}
