export default defineEventHandler(async (event) => {
  const { client, manage } = useContentstackRestClient();

  const { entries } = await client<Root>(
    `/content_types/building_permit_project/entries`,
  );

  // const { taxonomies } = await manage<{ taxonomies: FullTaxonomy[] }>(
  //   `/taxonomies`,
  //   {
  //     query: {
  //       query: {
  //         uid: {
  //           $in: [
  //             "building_permit_project_category",
  //             "building_permit_project_subcategory",
  //           ],
  //         },
  //       },
  //     },
  //   }
  // );

  return entries;
  // taxonomies,
});
