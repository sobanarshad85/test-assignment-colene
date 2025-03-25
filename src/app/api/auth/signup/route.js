import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";
import generateToken from "@/app/utils/generateToken";
import { apiResponse } from "@/app/utils/apiResponse";

export async function POST(req) {
    try {
        await dbConnect();

        const { email, password } = await req.json()
        if (!email, !password) {
            return NextResponse.json(apiResponse(400, "email & password is required", true))
        }

        const exxistingUser = await User.findOne({ email })
        if (exxistingUser) {
            return NextResponse.json(apiResponse(400, 'User already exists', true))
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashedPassword })
        const data = {
            token: generateToken(newUser._id)
        }

        return NextResponse.json(apiResponse(201, 'user registered successfully', false, data))

    } catch (error) {
        console.log(error)
        return NextResponse.json(apiResponse(500, 'internel server error', true))
    }
}