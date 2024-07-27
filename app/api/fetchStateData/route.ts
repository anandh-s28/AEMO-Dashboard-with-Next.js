import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get('state');

  if (!state) {
    return NextResponse.json({ error: 'Table name is required' }, { status: 400 });
  }

  const { data, error } = await supabase
  .from(state)
  .select("SETTLEMENTDATE, TOTALDEMAND")
  .order("SETTLEMENTDATE", { ascending: false })
  .limit(5);

  if (error) {
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  }

  const formattedData = (data || []).reverse().map((item) => ({
    date: new Date(item.SETTLEMENTDATE).toLocaleString(), 
    total_demand: item.TOTALDEMAND,
  }));

  return NextResponse.json(formattedData);
}
