/**
 * Firebase Admin Configuration interface.
 */
export interface FirebaseAdminConfig {
    /**
     * The type of the service account.
     */
    type?: string;
    /**
     * The project ID associated with the service account.
     */
    project_id: string;
    /**
     * The private key ID of the service account.
     */
    private_key_id: string;
    /**
     * The private key of the service account.
     */
    private_key: string;
    /**
     * The client email of the service account.
     */
    client_email: string;
    /**
     * The client ID of the service account.
     */
    client_id?: string;
    /**
     * The authentication URI for the service account.
     */
    auth_uri?: string;
    /**
     * The token URI for the service account.
     */
    token_uri?: string;
    /**
     * The authentication provider's x509 certificate URL.
     */
    auth_provider_x509_cert_url?: string;
    /**
     * The client's x509 certificate URL.
     */
    client_x509_cert_url?: string;
    /**
     * The universe domain associated with the service account.
     */
    universe_domain?: string;
}

export interface FirestoreDatabase {
    name: string,
    projectId?: string,
    accessToken: string,
}


export interface FirestoreDocument {
    stringValue?: string,
    integerValue?: number,
    doubleValue?: number,
    booleanValue?: boolean,
    arrayValue?: { values: any[] },
    mapValue?: { fields: any },
    nullValue?: null
}

/**
 * Represents a RESTful response object containing a document.
 * @template T - The type of document in the response. Defaults to 'any'.
 * @param exists - The number of documents in the response.
 * @param data - The document data of type T.
 * @param error - Optional. Represents any error information in the response.
 */
export interface CompatibleDocument<T = any> {
    id: string,
    exists: () => boolean
    data?: () => T,
    error?: any
}

/**
 * Represents a RESTful response object containing documents.
 * @template T - The type of documents in the response. Defaults to 'any'.
 * @param size - The number of documents in the response.
 * @param empty - Indicates whether the response is empty.
 * @param docs - An array of documents of type T.
 * @param error - Optional. Represents any error information in the response.
 */
export interface RestDocuments<T = any> {
    size: number;
    empty: boolean;
    docs: T[];
    /**
     * Optional. Represents any error information in the response.
     */
    error?: any;
}