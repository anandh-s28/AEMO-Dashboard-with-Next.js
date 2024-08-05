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

    const formattedData = data.reduce((acc: any[], curr: any) => {
        const date = curr.DATETIME
        const existingEntry = acc.find(item => item.date === date);

        if (existingEntry) {
            existingEntry[curr.FUEL_CATEGORY.replace(/\s+/g, '')] = curr.total_generation;
        } else {
            acc.push({
                date,
                [curr.FUEL_CATEGORY.replace(/\s+/g, '')]: curr.total_generation,
            });
        }
        return acc;
    }, []);

    return NextResponse.json(formattedData);
}
