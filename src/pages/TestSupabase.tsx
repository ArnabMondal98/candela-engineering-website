import { useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function TestSupabase() {

    useEffect(() => {

        async function test() {

            const { data, error } = await supabase
                .from("contact_inquiries")
                .select("*")
                .limit(1)

            console.log(data)

            console.log(error)

        }

        test()

    }, [])

    return <h2>Testing Supabase...</h2>

}