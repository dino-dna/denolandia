// tslint:disable
// graphql typescript definitions

declare namespace denolandiaQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  /**
   * The root query type which gives access points into the data universe.
   */
  interface IQuery {
    __typename: 'Query';

    /**
     * Exposes the root query type nested one level down. This is helpful for Relay 1 which can only query top level fields if they are in a particular form.
     */
    query: IQuery;

    /**
     * The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`.
     */
    nodeId: string;

    /**
     * Fetches an object given its globally unique `ID`.
     */
    node: Node | null;

    /**
     * Reads and enables pagination through a set of `Package`.
     */
    allPackages: IPackagesConnection | null;
    packageById: IPackage | null;
    packageByNameAndOrganizationNameAndProjectName: IPackage | null;
    isAdmin: boolean | null;

    /**
     * Reads a single `Package` using its globally unique `ID`.
     */
    package: IPackage | null;
  }

  interface INodeOnQueryArguments {
    /**
     * The globally unique `ID`.
     */
    nodeId: string;
  }

  interface IAllPackagesOnQueryArguments {
    /**
     * Only read the first `n` values of the set.
     */
    first?: number | null;

    /**
     * Only read the last `n` values of the set.
     */
    last?: number | null;

    /**
     * Skip the first `n` values from our `after` cursor, an alternative to cursor based pagination. May not be used with `last`.
     */
    offset?: number | null;

    /**
     * Read all values in the set before (above) this cursor.
     */
    before?: any | null;

    /**
     * Read all values in the set after (below) this cursor.
     */
    after?: any | null;

    /**
     * The method to use when ordering `Package`.
     * @default [{"alias":"primary_key_asc","specs":[["name",true],["organization_name",true],["project_name",true]],"unique":true}]
     */
    orderBy?: Array<PackagesOrderBy> | null;

    /**
     * A condition to be used in determining which values should be returned by the collection.
     */
    condition?: IPackageCondition | null;

    /**
     * A filter to be used in determining which values should be returned by the collection.
     */
    filter?: IPackageFilter | null;
  }

  interface IPackageByIdOnQueryArguments {
    id: number;
  }

  interface IPackageByNameAndOrganizationNameAndProjectNameOnQueryArguments {
    name: string;
    organizationName: string;
    projectName: string;
  }

  interface IPackageOnQueryArguments {
    /**
     * The globally unique `ID` to be used in selecting a single `Package`.
     */
    nodeId: string;
  }

  /**
   * An object with a globally unique `ID`.
   */
  type Node = IQuery | IPackage;

  /**
   * An object with a globally unique `ID`.
   */
  interface INode {
    __typename: 'Node';

    /**
     * A globally unique identifier. Can be used in various places throughout the system to identify this single value.
     */
    nodeId: string;
  }

  /**
   * Methods to use when ordering `Package`.
   */
  const enum PackagesOrderBy {
    NATURAL = 'NATURAL',
    ID_ASC = 'ID_ASC',
    ID_DESC = 'ID_DESC',
    NAME_ASC = 'NAME_ASC',
    NAME_DESC = 'NAME_DESC',
    ORGANIZATION_NAME_ASC = 'ORGANIZATION_NAME_ASC',
    ORGANIZATION_NAME_DESC = 'ORGANIZATION_NAME_DESC',
    PROJECT_NAME_ASC = 'PROJECT_NAME_ASC',
    PROJECT_NAME_DESC = 'PROJECT_NAME_DESC',
    DESCRIPTION_HTML_ASC = 'DESCRIPTION_HTML_ASC',
    DESCRIPTION_HTML_DESC = 'DESCRIPTION_HTML_DESC',
    HOMEPAGE_URL_ASC = 'HOMEPAGE_URL_ASC',
    HOMEPAGE_URL_DESC = 'HOMEPAGE_URL_DESC',
    TOPICS_ASC = 'TOPICS_ASC',
    TOPICS_DESC = 'TOPICS_DESC',
    ISSUE_COUNT_ASC = 'ISSUE_COUNT_ASC',
    ISSUE_COUNT_DESC = 'ISSUE_COUNT_DESC',
    STARGAZER_COUNT_ASC = 'STARGAZER_COUNT_ASC',
    STARGAZER_COUNT_DESC = 'STARGAZER_COUNT_DESC',
    REPOSITORY_URL_ASC = 'REPOSITORY_URL_ASC',
    REPOSITORY_URL_DESC = 'REPOSITORY_URL_DESC',
    PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
    PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC'
  }

  /**
   * A condition to be used against `Package` object types. All fields are tested for equality and combined with a logical ‘and.’
   */
  interface IPackageCondition {
    /**
     * Checks for equality with the object’s `id` field.
     */
    id?: number | null;

    /**
     * Checks for equality with the object’s `name` field.
     */
    name?: string | null;

    /**
     * Checks for equality with the object’s `organizationName` field.
     */
    organizationName?: string | null;

    /**
     * Checks for equality with the object’s `projectName` field.
     */
    projectName?: string | null;

    /**
     * Checks for equality with the object’s `descriptionHtml` field.
     */
    descriptionHtml?: string | null;

    /**
     * Checks for equality with the object’s `homepageUrl` field.
     */
    homepageUrl?: string | null;

    /**
     * Checks for equality with the object’s `topics` field.
     */
    topics?: any | null;

    /**
     * Checks for equality with the object’s `issueCount` field.
     */
    issueCount?: number | null;

    /**
     * Checks for equality with the object’s `stargazerCount` field.
     */
    stargazerCount?: number | null;

    /**
     * Checks for equality with the object’s `repositoryUrl` field.
     */
    repositoryUrl?: string | null;
  }

  /**
   * A filter to be used against `Package` object types. All fields are combined with a logical ‘and.’
   */
  interface IPackageFilter {
    /**
     * Filter by the object’s `id` field.
     */
    id?: IIntFilter | null;

    /**
     * Filter by the object’s `name` field.
     */
    name?: IStringFilter | null;

    /**
     * Filter by the object’s `organizationName` field.
     */
    organizationName?: IStringFilter | null;

    /**
     * Filter by the object’s `projectName` field.
     */
    projectName?: IStringFilter | null;

    /**
     * Filter by the object’s `descriptionHtml` field.
     */
    descriptionHtml?: IStringFilter | null;

    /**
     * Filter by the object’s `homepageUrl` field.
     */
    homepageUrl?: IStringFilter | null;

    /**
     * Filter by the object’s `topics` field.
     */
    topics?: IJSONFilter | null;

    /**
     * Filter by the object’s `issueCount` field.
     */
    issueCount?: IIntFilter | null;

    /**
     * Filter by the object’s `stargazerCount` field.
     */
    stargazerCount?: IIntFilter | null;

    /**
     * Filter by the object’s `repositoryUrl` field.
     */
    repositoryUrl?: IStringFilter | null;

    /**
     * Checks for all expressions in this list.
     */
    and?: Array<IPackageFilter> | null;

    /**
     * Checks for any expressions in this list.
     */
    or?: Array<IPackageFilter> | null;

    /**
     * Negates the expression.
     */
    not?: IPackageFilter | null;
  }

  /**
   * A filter to be used against Int fields. All fields are combined with a logical ‘and.’
   */
  interface IIntFilter {
    /**
     * Is null (if `true` is specified) or is not null (if `false` is specified).
     */
    isNull?: boolean | null;

    /**
     * Equal to the specified value.
     */
    equalTo?: number | null;

    /**
     * Not equal to the specified value.
     */
    notEqualTo?: number | null;

    /**
     * Not equal to the specified value, treating null like an ordinary value.
     */
    distinctFrom?: number | null;

    /**
     * Equal to the specified value, treating null like an ordinary value.
     */
    notDistinctFrom?: number | null;

    /**
     * Included in the specified list.
     */
    in?: Array<number> | null;

    /**
     * Not included in the specified list.
     */
    notIn?: Array<number> | null;

    /**
     * Less than the specified value.
     */
    lessThan?: number | null;

    /**
     * Less than or equal to the specified value.
     */
    lessThanOrEqualTo?: number | null;

    /**
     * Greater than the specified value.
     */
    greaterThan?: number | null;

    /**
     * Greater than or equal to the specified value.
     */
    greaterThanOrEqualTo?: number | null;
  }

  /**
   * A filter to be used against String fields. All fields are combined with a logical ‘and.’
   */
  interface IStringFilter {
    /**
     * Is null (if `true` is specified) or is not null (if `false` is specified).
     */
    isNull?: boolean | null;

    /**
     * Equal to the specified value.
     */
    equalTo?: string | null;

    /**
     * Not equal to the specified value.
     */
    notEqualTo?: string | null;

    /**
     * Not equal to the specified value, treating null like an ordinary value.
     */
    distinctFrom?: string | null;

    /**
     * Equal to the specified value, treating null like an ordinary value.
     */
    notDistinctFrom?: string | null;

    /**
     * Included in the specified list.
     */
    in?: Array<string> | null;

    /**
     * Not included in the specified list.
     */
    notIn?: Array<string> | null;

    /**
     * Less than the specified value.
     */
    lessThan?: string | null;

    /**
     * Less than or equal to the specified value.
     */
    lessThanOrEqualTo?: string | null;

    /**
     * Greater than the specified value.
     */
    greaterThan?: string | null;

    /**
     * Greater than or equal to the specified value.
     */
    greaterThanOrEqualTo?: string | null;

    /**
     * Contains the specified string (case-sensitive).
     */
    includes?: string | null;

    /**
     * Does not contain the specified string (case-sensitive).
     */
    notIncludes?: string | null;

    /**
     * Contains the specified string (case-insensitive).
     */
    includesInsensitive?: string | null;

    /**
     * Does not contain the specified string (case-insensitive).
     */
    notIncludesInsensitive?: string | null;

    /**
     * Starts with the specified string (case-sensitive).
     */
    startsWith?: string | null;

    /**
     * Does not start with the specified string (case-sensitive).
     */
    notStartsWith?: string | null;

    /**
     * Starts with the specified string (case-insensitive).
     */
    startsWithInsensitive?: string | null;

    /**
     * Does not start with the specified string (case-insensitive).
     */
    notStartsWithInsensitive?: string | null;

    /**
     * Ends with the specified string (case-sensitive).
     */
    endsWith?: string | null;

    /**
     * Does not end with the specified string (case-sensitive).
     */
    notEndsWith?: string | null;

    /**
     * Ends with the specified string (case-insensitive).
     */
    endsWithInsensitive?: string | null;

    /**
     * Does not end with the specified string (case-insensitive).
     */
    notEndsWithInsensitive?: string | null;

    /**
     * Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters.
     */
    like?: string | null;

    /**
     * Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters.
     */
    notLike?: string | null;

    /**
     * Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters.
     */
    likeInsensitive?: string | null;

    /**
     * Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters.
     */
    notLikeInsensitive?: string | null;

    /**
     * Matches the specified pattern using the SQL standard's definition of a regular expression.
     */
    similarTo?: string | null;

    /**
     * Does not match the specified pattern using the SQL standard's definition of a regular expression.
     */
    notSimilarTo?: string | null;
  }

  /**
   * A filter to be used against JSON fields. All fields are combined with a logical ‘and.’
   */
  interface IJSONFilter {
    /**
     * Is null (if `true` is specified) or is not null (if `false` is specified).
     */
    isNull?: boolean | null;

    /**
     * Equal to the specified value.
     */
    equalTo?: any | null;

    /**
     * Not equal to the specified value.
     */
    notEqualTo?: any | null;

    /**
     * Not equal to the specified value, treating null like an ordinary value.
     */
    distinctFrom?: any | null;

    /**
     * Equal to the specified value, treating null like an ordinary value.
     */
    notDistinctFrom?: any | null;

    /**
     * Included in the specified list.
     */
    in?: Array<any> | null;

    /**
     * Not included in the specified list.
     */
    notIn?: Array<any> | null;

    /**
     * Contains the specified JSON.
     */
    contains?: any | null;

    /**
     * Contained by the specified JSON.
     */
    containedBy?: any | null;
  }

  /**
   * A connection to a list of `Package` values.
   */
  interface IPackagesConnection {
    __typename: 'PackagesConnection';

    /**
     * A list of `Package` objects.
     */
    nodes: Array<IPackage | null>;

    /**
     * A list of edges which contains the `Package` and cursor to aid in pagination.
     */
    edges: Array<IPackagesEdge>;

    /**
     * Information to aid in pagination.
     */
    pageInfo: IPageInfo;

    /**
     * The count of *all* `Package` you could get from the connection.
     */
    totalCount: number | null;
  }

  interface IPackage {
    __typename: 'Package';

    /**
     * A globally unique identifier. Can be used in various places throughout the system to identify this single value.
     */
    nodeId: string;
    id: number;
    name: string;
    organizationName: string;
    projectName: string;
    descriptionHtml: string | null;
    homepageUrl: string | null;
    topics: any | null;
    issueCount: number | null;
    stargazerCount: number | null;
    repositoryUrl: string;
  }

  /**
   * A `Package` edge in the connection.
   */
  interface IPackagesEdge {
    __typename: 'PackagesEdge';

    /**
     * A cursor for use in pagination.
     */
    cursor: any | null;

    /**
     * The `Package` at the end of the edge.
     */
    node: IPackage | null;
  }

  /**
   * Information about pagination in a connection.
   */
  interface IPageInfo {
    __typename: 'PageInfo';

    /**
     * When paginating forwards, are there more items?
     */
    hasNextPage: boolean;

    /**
     * When paginating backwards, are there more items?
     */
    hasPreviousPage: boolean;

    /**
     * When paginating backwards, the cursor to continue.
     */
    startCursor: any | null;

    /**
     * When paginating forwards, the cursor to continue.
     */
    endCursor: any | null;
  }

  /**
   * The root mutation type which contains root level fields which mutate data.
   */
  interface IMutation {
    __typename: 'Mutation';

    /**
     * Creates a single `Package`.
     */
    createPackage: ICreatePackagePayload | null;

    /**
     * Updates a single `Package` using its globally unique id and a patch.
     */
    updatePackage: IUpdatePackagePayload | null;

    /**
     * Updates a single `Package` using a unique key and a patch.
     */
    updatePackageById: IUpdatePackagePayload | null;

    /**
     * Updates a single `Package` using a unique key and a patch.
     */
    updatePackageByNameAndOrganizationNameAndProjectName: IUpdatePackagePayload | null;

    /**
     * Deletes a single `Package` using its globally unique id.
     */
    deletePackage: IDeletePackagePayload | null;

    /**
     * Deletes a single `Package` using a unique key.
     */
    deletePackageById: IDeletePackagePayload | null;

    /**
     * Deletes a single `Package` using a unique key.
     */
    deletePackageByNameAndOrganizationNameAndProjectName: IDeletePackagePayload | null;

    /**
     * Upserts a single `Package`.
     */
    upsertPackage: IUpsertPackagePayload | null;
  }

  interface ICreatePackageOnMutationArguments {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: ICreatePackageInput;
  }

  interface IUpdatePackageOnMutationArguments {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: IUpdatePackageInput;
  }

  interface IUpdatePackageByIdOnMutationArguments {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: IUpdatePackageByIdInput;
  }

  interface IUpdatePackageByNameAndOrganizationNameAndProjectNameOnMutationArguments {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: IUpdatePackageByNameAndOrganizationNameAndProjectNameInput;
  }

  interface IDeletePackageOnMutationArguments {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: IDeletePackageInput;
  }

  interface IDeletePackageByIdOnMutationArguments {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: IDeletePackageByIdInput;
  }

  interface IDeletePackageByNameAndOrganizationNameAndProjectNameOnMutationArguments {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: IDeletePackageByNameAndOrganizationNameAndProjectNameInput;
  }

  interface IUpsertPackageOnMutationArguments {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: IUpsertPackageInput;
  }

  /**
   * All input for the create `Package` mutation.
   */
  interface ICreatePackageInput {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: string | null;

    /**
     * The `Package` to be created by this mutation.
     */
    package: IPackageInput;
  }

  /**
   * An input for mutations affecting `Package`
   */
  interface IPackageInput {
    id?: number | null;
    name: string;
    organizationName: string;
    projectName: string;
    descriptionHtml?: string | null;
    homepageUrl?: string | null;
    topics?: any | null;
    issueCount?: number | null;
    stargazerCount?: number | null;
    repositoryUrl: string;
  }

  /**
   * The output of our create `Package` mutation.
   */
  interface ICreatePackagePayload {
    __typename: 'CreatePackagePayload';

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId: string | null;

    /**
     * The `Package` that was created by this mutation.
     */
    package: IPackage | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query: IQuery | null;

    /**
     * An edge for our `Package`. May be used by Relay 1.
     */
    packageEdge: IPackagesEdge | null;
  }

  interface IPackageEdgeOnCreatePackagePayloadArguments {
    /**
     * The method to use when ordering `Package`.
     * @default {"alias":"primary_key_asc","specs":[["name",true],["organization_name",true],["project_name",true]],"unique":true}
     */
    orderBy?: Array<PackagesOrderBy> | null;
  }

  /**
   * All input for the `updatePackage` mutation.
   */
  interface IUpdatePackageInput {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: string | null;

    /**
     * The globally unique `ID` which will identify a single `Package` to be updated.
     */
    nodeId: string;

    /**
     * An object where the defined keys will be set on the `Package` being updated.
     */
    packagePatch: IPackagePatch;
  }

  /**
   * Represents an update to a `Package`. Fields that are set will be updated.
   */
  interface IPackagePatch {
    id?: number | null;
    name?: string | null;
    organizationName?: string | null;
    projectName?: string | null;
    descriptionHtml?: string | null;
    homepageUrl?: string | null;
    topics?: any | null;
    issueCount?: number | null;
    stargazerCount?: number | null;
    repositoryUrl?: string | null;
  }

  /**
   * The output of our update `Package` mutation.
   */
  interface IUpdatePackagePayload {
    __typename: 'UpdatePackagePayload';

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId: string | null;

    /**
     * The `Package` that was updated by this mutation.
     */
    package: IPackage | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query: IQuery | null;

    /**
     * An edge for our `Package`. May be used by Relay 1.
     */
    packageEdge: IPackagesEdge | null;
  }

  interface IPackageEdgeOnUpdatePackagePayloadArguments {
    /**
     * The method to use when ordering `Package`.
     * @default {"alias":"primary_key_asc","specs":[["name",true],["organization_name",true],["project_name",true]],"unique":true}
     */
    orderBy?: Array<PackagesOrderBy> | null;
  }

  /**
   * All input for the `updatePackageById` mutation.
   */
  interface IUpdatePackageByIdInput {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: string | null;

    /**
     * An object where the defined keys will be set on the `Package` being updated.
     */
    packagePatch: IPackagePatch;
    id: number;
  }

  /**
   * All input for the `updatePackageByNameAndOrganizationNameAndProjectName` mutation.
   */
  interface IUpdatePackageByNameAndOrganizationNameAndProjectNameInput {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: string | null;

    /**
     * An object where the defined keys will be set on the `Package` being updated.
     */
    packagePatch: IPackagePatch;
    name: string;
    organizationName: string;
    projectName: string;
  }

  /**
   * All input for the `deletePackage` mutation.
   */
  interface IDeletePackageInput {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: string | null;

    /**
     * The globally unique `ID` which will identify a single `Package` to be deleted.
     */
    nodeId: string;
  }

  /**
   * The output of our delete `Package` mutation.
   */
  interface IDeletePackagePayload {
    __typename: 'DeletePackagePayload';

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId: string | null;

    /**
     * The `Package` that was deleted by this mutation.
     */
    package: IPackage | null;
    deletedPackageId: string | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query: IQuery | null;

    /**
     * An edge for our `Package`. May be used by Relay 1.
     */
    packageEdge: IPackagesEdge | null;
  }

  interface IPackageEdgeOnDeletePackagePayloadArguments {
    /**
     * The method to use when ordering `Package`.
     * @default {"alias":"primary_key_asc","specs":[["name",true],["organization_name",true],["project_name",true]],"unique":true}
     */
    orderBy?: Array<PackagesOrderBy> | null;
  }

  /**
   * All input for the `deletePackageById` mutation.
   */
  interface IDeletePackageByIdInput {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: string | null;
    id: number;
  }

  /**
   * All input for the `deletePackageByNameAndOrganizationNameAndProjectName` mutation.
   */
  interface IDeletePackageByNameAndOrganizationNameAndProjectNameInput {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: string | null;
    name: string;
    organizationName: string;
    projectName: string;
  }

  /**
   * All input for the upsert `Package` mutation.
   */
  interface IUpsertPackageInput {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: string | null;

    /**
     * The `Package` to be upserted by this mutation.
     */
    package: IPackageInput;
  }

  /**
   * The output of our upsert `Package` mutation.
   */
  interface IUpsertPackagePayload {
    __typename: 'UpsertPackagePayload';

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId: string | null;

    /**
     * The `Package` that was upserted by this mutation.
     */
    package: IPackage | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query: IQuery | null;

    /**
     * An edge for our `Package`. May be used by Relay 1.
     */
    packageEdge: IPackagesEdge | null;
  }

  interface IPackageEdgeOnUpsertPackagePayloadArguments {
    /**
     * The method to use when ordering `Package`.
     * @default {"alias":"primary_key_asc","specs":[["name",true],["organization_name",true],["project_name",true]],"unique":true}
     */
    orderBy?: Array<PackagesOrderBy> | null;
  }
}

// tslint:enable
