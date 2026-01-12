import http from "../config/http.config";

import type { ICollection } from "../pages/collection/CollectionListPage";

export const getCollections = async (searchText: string | null, offset: number, limit: number) => {
  const urlParams = new URLSearchParams();
  if (searchText) {
    urlParams.append("searchText", searchText);
  }
  urlParams.append("offset", offset.toString());
  urlParams.append("limit", limit.toString());

  return http.get("/master/collection", {params: urlParams});
};

export const createCollection = async (collection: ICollection) => {
  return http.post("/master/collection", collection);
};

export const updateCollection = async (id: number, collection: ICollection) => {
  return http.put("/master/collection/"+id, collection);
};

export const deleteCollectionService = async (id: number) => {
  return http.delete("/master/collection/"+id);
};