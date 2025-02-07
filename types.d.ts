type ToDo = any;

interface Root {
  entries: Entry[];
}

interface Entry {
  uid: string;
  _version: number;
  locale: string;
  ACL: Acl;
  _in_progress: boolean;
  aliases: string[];
  commercial_fee: number;
  created_at: string;
  created_by: string;
  residential_fee: number;
  square_footage: boolean;
  tags: string[];
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

interface FullTaxonomy {
  uid: string;
  name: string;
  description: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
}

interface AlgoliaProjectEntry extends Entry {
  objectID: string;
}

interface ModelSelectionsType {
  type: "Residential" | "Commercial";
  squareFootage?: number;
  ppReview: boolean;
  ppInspection: boolean;
}

declare module "vue-instantsearch/vue3/es";
