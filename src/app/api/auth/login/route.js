import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { apiResponse } from "@/app/utils/apiResponse";
import generateToken from "@/app/utils/generateToken";
import User from "@/app/models/User";
import dbConnect from "@/app/lib/dbConnect";

export async function POST(req) {
    try {
        await dbConnect();

        const { email, password } = await req.json()
        if (!email, !password) {
            return NextResponse.json(apiResponse(400, 'Email & password is required', true))
        }

        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json(apiResponse(401, 'Invalid credentials', true))
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if (!isPasswordMatched) {
            return NextResponse.json(apiResponse(401, 'invalid credentials', true))
        }

        const data = {
            token: generateToken(user._id)
        }

        return NextResponse.json(apiResponse(200, 'Login successfull', false, data))

    } catch (error){
        console.log(error)
        return NextResponse.json(apiResponse(500, 'internel server error', true))
    }
}