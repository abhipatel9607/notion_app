import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const pagesApi = createApi({
  reducerPath: "page",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["pageType"],
  endpoints: (builder) => ({
    getPages: builder.query({
      async queryFn(pageId) {
        try {
          const pagesRef = doc(db, "pages", pageId);
          const pagesDoc = await getDoc(pagesRef);

          if (pagesDoc.exists()) {
            console.log("Data retrieved successfully:", pagesDoc.data());
            return { data: pagesDoc.data() };
          } else {
            throw new Error("Pages not found");
          }
        } catch (error) {
          console.error("Error in queryFn:", error);
          return { error };
        }
      },
      providesTags: ["pageType"],
    }),
  }),
});

export const { useGetPagesQuery } = pagesApi;
