import { meiliClient } from "./meili";

function normalizeLocationFields(doc) {
  return {
    ...doc,
    state: doc.state?.toLowerCase(),
    district: doc.district?.toLowerCase(),
    area: doc.area?.toLowerCase(),
    taluka: doc.taluka?.toLowerCase(),
  };
}

/* ADD OR UPDATE */
export const syncToSearch = async (indexName, document) => {
  try {
    const normalizedDoc = normalizeLocationFields(document);
    await meiliClient.index(indexName).addDocuments([normalizedDoc]);
  } catch (error) {
    console.error("Search sync error:", error);
  }
};

/* DELETE */
export const deleteFromSearch = async (indexName, id) => {
  try {
    await meiliClient.index(indexName).deleteDocument(id);
  } catch (error) {
    console.error("Search delete error:", error);
  }
};