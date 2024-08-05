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
      .from("fuel_types")
      .select("FUEL_TYPE, SUPPLY").eq("STATE",state)
      .order("DATETIME", { ascending: false })
      .limit(10); 
  
    if (error) {
      return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
    }

    const formattedData = (data || []).reverse().map((item) => ({
        supply: item.SUPPLY,
        fuel_type: item.FUEL_TYPE
      }));
    
      return NextResponse.json(formattedData);
    }
  