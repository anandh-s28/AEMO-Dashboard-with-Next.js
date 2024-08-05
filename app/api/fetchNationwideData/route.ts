import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
    const { data, error } = await supabase
    .rpc('get_aggregation');
    if (error) {
        return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
    }
    return NextResponse.json(data);
}