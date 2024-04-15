
import { typedEnv } from "..";
import { FirestoreDocument, RestDocuments } from "../types";
import { formatValuesWithType, generateFirebaseReqHeaders } from "./utils";

/**
 * Fetches documents from Firestore.
 * @param {string} collectionPath - The path to the Firestore collection.
 * @param {Object| undefined} options - Additional options for fetching documents.
 * @param {number | undefined} options.limit - Optional. The maximum number of documents to fetch defaults to 100.
 * @param {string | undefined} options.nextPageToken - The token for fetching the next page of documents.
 * @template T - The type of the documents being fetched. Defaults to 'any'.
* @returns {Promise<RestDocuments<T>>} A Promise that resolves to a response object containing fetched Firestore documents.
 */
export async function getDocsEdge<T = any>(
    collectionPath: string,
    options?: {
        limit?: number,
        nextPageToken?: string
    }): Promise<RestDocuments<T>> {
    try {

        let qs = new URLSearchParams({
            fields: 'documents(fields,name),nextPageToken',
        });

        if (options?.nextPageToken) {
            qs.append('pageToken', options.nextPageToken);
        }

        const res: any = await fetch(`https://firestore.googleapis.com/v1beta1/projects/speakwiz-app/databases/${typedEnv.FIREBASE_REST_DATABASE_ID}/documents/${collectionPath}?${qs.toString()}&pageSize=${options?.limit || 100}`, {
            method: 'GET',
            headers: {
                ...generateFirebaseReqHeaders(typedEnv.FIREBASE_REST_DATABASE_ID)
                // "Authorization": "Bearer " + accessToken,
                // "x-goog-request-params": `project_id=speakwiz-app&database_id=${options.bucket}`
            },
        }).then((res) => res.json());

        const rawDocs = res?.documents || [];

        if (rawDocs?.length > 0) {
            const docs = rawDocs.map((docRef: {
                name: string,
                fields: {
                    [key: string]: FirestoreDocument
                }
            }) => {
                return formatValuesWithType(docRef);
            });

            return {
                size: docs?.length,
                empty: docs?.length === 0,
                docs: docs
            };
        } else {
            return {
                size: 0,
                empty: true,
                docs: []
            };
        }
    } catch (error) {
        console.error(error);
        return {
            size: 0,
            empty: true,
            docs: [],
            error: error
        };
    }
}
