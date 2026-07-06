const { error } = await supabase.auth.signInWithPassword({

    email: 'candelaengineering.service2016@gmail.com',
    password: 'candela@123'
})