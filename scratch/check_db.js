async function check() {
    const url = 'https://gkaniaerppgrwiyfznvb.supabase.co/rest/v1/team_members?select=*';
    const key = 'sb_publishable_SyyEq_lqVRprAfdsJSwtrg_BIXbaZXm';
    try {
        const res = await fetch(url, {
            headers: {
                'apikey': key,
                'Authorization': `Bearer ${key}`
            }
        });
        const data = await res.json();
        console.log('Status:', res.status);
        console.log('Data:', data);
    } catch(e) {
        console.log('Error:', e);
    }
}
check();
