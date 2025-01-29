import { createClient } from "@sanity/client";


// Ensure backend environment variables are being read
const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'default_project_id',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: process.env.SANITY_API_VERSION || '2021-08-31',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export default sanity;
