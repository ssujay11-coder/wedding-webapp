const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Manually parse .env.local
let envConfig = {};
try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
            const key = match[1].trim();
            let value = match[2].trim();
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }
            envConfig[key] = value;
        }
    });
} catch (e) {
    console.error('Could not read .env.local', e);
}

const supabaseUrl = envConfig.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = envConfig.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
    console.log(`Connecting to ${supabaseUrl}...`);
    try {
        // Try to fetch something public or just get session
        // Since we don't know exact tables, accessing a non-existent table usually returns a specific error or 200 with [] if RLS allows.
        // Better to just try and see if we get a network error vs a database error.

        // Attempt to access a likely existing table 'profiles' or just 'media' or check health if possible.
        // Actually, just a simple query is enough.
        const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });

        if (error) {
            // Even an authorization error means we reached the server.
            // A network error would be different.
            console.log('Connection successful (received response from server).');
            console.log('Response Error (expected if not logged in/RLS):', error.message);
        } else {
            console.log('Connection successful. Data accessible.');
        }
    } catch (err) {
        console.error('Connection failed:', err.message);
        process.exit(1);
    }
}

testConnection();
