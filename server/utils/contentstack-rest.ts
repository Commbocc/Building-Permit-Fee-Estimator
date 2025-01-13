export function useContentstackRestClient(rest_api_version: string = "v3") {
  // https://www.contentstack.com/docs/developers/apis/content-delivery-api
  const client = $fetch.create({
    baseURL: `https://cdn.contentstack.io/${rest_api_version}`,
    headers: {
      api_key: process.env.CONTENTSTACK_API_KEY ?? "",
      access_token: process.env.CONTENTSTACK_DELIVERY_TOKEN ?? "",
    },
  });

  // https://www.contentstack.com/docs/developers/apis/content-management-api
  const manage = $fetch.create({
    baseURL: `https://api.contentstack.io/${rest_api_version}`,
    headers: {
      api_key: process.env.CONTENTSTACK_API_KEY ?? "",
      authorization: process.env.CONTENTSTACK_MANAGEMENT_TOKEN ?? "",
    },
  });

  return { client, manage };
}
