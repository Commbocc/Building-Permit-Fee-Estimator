export function useContentstackRestClient(rest_api_version: string = "v3") {
  const client = $fetch.create({
    baseURL: `https://cdn.contentstack.io/${rest_api_version}`,
    headers: {
      api_key: process.env.CONTENTSTACK_API_KEY ?? "",
      access_token: process.env.CONTENTSTACK_DELIVERY_TOKEN ?? "",
    },
  });

  return { client };
}
