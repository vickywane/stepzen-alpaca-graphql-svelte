import { createClient } from '@urql/svelte'

export const GraphqlClient = createClient({
    url: import.meta.env.VITE_STEPZEN_API_URL,
    fetchOptions: () => (
        {
            headers: { 'Authorization': `Apikey ${import.meta.env.VITE_STEPZEN_API_KEY}` },
        }
    )
});
