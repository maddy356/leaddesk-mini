import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectToDatabase from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    
    const { email, password } = await req.json();

    if (!email || !password || password.length < 6) {
      return NextResponse.json({ error: 'Email and a password (min 6 characters) are required' }, { status: 400 });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json({ error: 'An admin with this email already exists' }, { status: 400 });
    }

    const hash = await bcrypt.hash(password, 10);
    await Admin.create({ email, passwordHash: hash });

    return NextResponse.json({ success: true, message: 'Admin registered successfully' }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
