export default defineEventHandler(async (event) => {
  const { client } = useContentstackRestClient();

  const data = await client<Root>(
    `/content_types/building_permit_project/entries`
  );

  return data;
});

interface Root {
  entries: Entry[];
}

interface Entry {
  uid: string;
  _version: number;
  locale: string;
  ACL: Acl;
  _in_progress: boolean;
  aliases: any[];
  commercial_fee: any;
  created_at: string;
  created_by: string;
  residential_fee: number;
  square_footage: boolean;
  tags: any[];
  taxonomies: Taxonomy[];
  title: string;
  updated_at: string;
  updated_by: string;
  publish_details: PublishDetails;
}

interface Acl {}

interface Taxonomy {
  taxonomy_uid: string;
  term_uid: string;
}

interface PublishDetails {
  time: string;
  user: string;
  environment: string;
  locale: string;
}
