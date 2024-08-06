import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
    const { data, error } = await supabase
      .rpc('total_agg');

    if (error) {
        return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
    }
    const formattedData = (data || []).reverse().map((total_agg: { total_generation: string; FUEL_TYPE: string; }) => ({
      total_generation: total_agg.total_generation,
      fuel_type: total_agg.FUEL_TYPE
    }));
    console.log(formattedData[0].fuel_type);
  
    return NextResponse.json(formattedData);
}