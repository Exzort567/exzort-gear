const domain = process.env.SHOPIFY_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_TOKEN;

export async function fetchShopify({ query, variables } : { query: string; variables?: Record<string, any> }) {
    const endpoint = `https://${domain}/api/2024-01/graphql.json`;

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": storefrontAccessToken || "",
        },
        body: JSON.stringify({ query, variables }),
    });

    return response.json();
}