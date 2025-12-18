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
        next: { revalidate: 60 } // Cache for 1 minute (faster updates during development)
    });

    if (!response.ok) {
        throw new Error(`Shopify API error: ${response.statusText}`);
    }

    const json = await response.json();
    
    if (json.errors) {
        console.error('Shopify GraphQL errors:', json.errors);
        throw new Error('GraphQL query failed');
    }

    return json;
}

// Helper function to create Shopify checkout
export async function createCheckout(lineItems: Array<{ variantId: string; quantity: number }>) {
    const mutation = `
        mutation checkoutCreate($input: CheckoutCreateInput!) {
            checkoutCreate(input: $input) {
                checkout {
                    id
                    webUrl
                }
                checkoutUserErrors {
                    message
                    field
                }
            }
        }
    `;

    const variables = {
        input: {
            lineItems: lineItems.map(item => ({
                variantId: item.variantId,
                quantity: item.quantity
            }))
        }
    };

    const response = await fetchShopify({ query: mutation, variables });
    return response.data?.checkoutCreate;
}