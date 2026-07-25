import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Lead from '@/models/Lead';
import { verifyAuth } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    
    // Basic server-side validation
    const { name, email, phone, budgetRange, message } = body;
    if (!name || !email || !phone || !budgetRange || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      budgetRange,
      message,
    });

    return NextResponse.json({ success: true, data: lead }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Only admins should fetch all leads
    const session = await verifyAuth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: leads });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
