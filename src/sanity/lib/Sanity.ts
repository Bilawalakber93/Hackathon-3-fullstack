import { createClient } from "@sanity/client";


// Ensure backend environment variables are being read
const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "",
  apiVersion: process.env.SANITY_API_VERSION || process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2021-08-31',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export default sanity;
