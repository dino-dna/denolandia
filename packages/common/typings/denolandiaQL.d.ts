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
     * Reads and enables pagination through a set of `Module`.
     */
    allModules: IModulesConnection | null;
    moduleById: IModule | null;
    moduleByNameAndOrganizationNameAndProjectName: IModule | null;
    isAdmin: boolean | null;

    /**
     * Reads a single `Module` using its globally unique `ID`.
     */
    module: IModule | null;
  }

  interface INodeOnQueryArguments {
    /**
     * The globally unique `ID`.
     */
    nodeId: string;
  }

  interface IAllModulesOnQueryArguments {
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
     * The method to use when ordering `Module`.
     * @default [{"alias":"primary_key_asc","specs":[["name",true],["organization_name",true],["project_name",true]],"unique":true}]
     */
    orderBy?: Array<ModulesOrderBy> | null;

    /**
     * A condition to be used in determining which values should be returned by the collection.
     */
    condition?: IModuleCondition | null;

    /**
     * A filter to be used in determining which values should be returned by the collection.
     */
    filter?: IModuleFilter | null;
  }

  interface IModuleByIdOnQueryArguments {
    id: number;
  }

  interface IModuleByNameAndOrganizationNameAndProjectNameOnQueryArguments {
    name: string;
    organizationName: string;
    projectName: string;
  }

  interface IModuleOnQueryArguments {
    /**
     * The globally unique `ID` to be used in selecting a single `Module`.
     */
    nodeId: string;
  }

  /**
   * An object with a globally unique `ID`.
   */
  type Node = IQuery | IModule;

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
   * Methods to use when ordering `Module`.
   */
  const enum ModulesOrderBy {
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
    LATEST_RELEASE_ASC = 'LATEST_RELEASE_ASC',
    LATEST_RELEASE_DESC = 'LATEST_RELEASE_DESC',
    LICENSE_SPDX_ID_ASC = 'LICENSE_SPDX_ID_ASC',
    LICENSE_SPDX_ID_DESC = 'LICENSE_SPDX_ID_DESC',
    PRIMARY_KEY_ASC = 'PRIMARY_KEY_ASC',
    PRIMARY_KEY_DESC = 'PRIMARY_KEY_DESC'
  }

  /**
   * A condition to be used against `Module` object types. All fields are tested for equality and combined with a logical ‘and.’
   */
  interface IModuleCondition {
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

    /**
     * Checks for equality with the object’s `latestRelease` field.
     */
    latestRelease?: string | null;

    /**
     * Checks for equality with the object’s `licenseSpdxId` field.
     */
    licenseSpdxId?: string | null;
  }

  /**
   * A filter to be used against `Module` object types. All fields are combined with a logical ‘and.’
   */
  interface IModuleFilter {
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
     * Filter by the object’s `latestRelease` field.
     */
    latestRelease?: IStringFilter | null;

    /**
     * Filter by the object’s `licenseSpdxId` field.
     */
    licenseSpdxId?: IStringFilter | null;

    /**
     * Checks for all expressions in this list.
     */
    and?: Array<IModuleFilter> | null;

    /**
     * Checks for any expressions in this list.
     */
    or?: Array<IModuleFilter> | null;

    /**
     * Negates the expression.
     */
    not?: IModuleFilter | null;
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
   * A connection to a list of `Module` values.
   */
  interface IModulesConnection {
    __typename: 'ModulesConnection';

    /**
     * A list of `Module` objects.
     */
    nodes: Array<IModule | null>;

    /**
     * A list of edges which contains the `Module` and cursor to aid in pagination.
     */
    edges: Array<IModulesEdge>;

    /**
     * Information to aid in pagination.
     */
    pageInfo: IPageInfo;

    /**
     * The count of *all* `Module` you could get from the connection.
     */
    totalCount: number | null;
  }

  interface IModule {
    __typename: 'Module';

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
    latestRelease: string | null;
    licenseSpdxId: string | null;
  }

  /**
   * A `Module` edge in the connection.
   */
  interface IModulesEdge {
    __typename: 'ModulesEdge';

    /**
     * A cursor for use in pagination.
     */
    cursor: any | null;

    /**
     * The `Module` at the end of the edge.
     */
    node: IModule | null;
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
     * Creates a single `Module`.
     */
    createModule: ICreateModulePayload | null;

    /**
     * Updates a single `Module` using its globally unique id and a patch.
     */
    updateModule: IUpdateModulePayload | null;

    /**
     * Updates a single `Module` using a unique key and a patch.
     */
    updateModuleById: IUpdateModulePayload | null;

    /**
     * Updates a single `Module` using a unique key and a patch.
     */
    updateModuleByNameAndOrganizationNameAndProjectName: IUpdateModulePayload | null;

    /**
     * Deletes a single `Module` using its globally unique id.
     */
    deleteModule: IDeleteModulePayload | null;

    /**
     * Deletes a single `Module` using a unique key.
     */
    deleteModuleById: IDeleteModulePayload | null;

    /**
     * Deletes a single `Module` using a unique key.
     */
    deleteModuleByNameAndOrganizationNameAndProjectName: IDeleteModulePayload | null;

    /**
     * Upserts a single `Module`.
     */
    upsertModule: IUpsertModulePayload | null;
  }

  interface ICreateModuleOnMutationArguments {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: ICreateModuleInput;
  }

  interface IUpdateModuleOnMutationArguments {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: IUpdateModuleInput;
  }

  interface IUpdateModuleByIdOnMutationArguments {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: IUpdateModuleByIdInput;
  }

  interface IUpdateModuleByNameAndOrganizationNameAndProjectNameOnMutationArguments {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: IUpdateModuleByNameAndOrganizationNameAndProjectNameInput;
  }

  interface IDeleteModuleOnMutationArguments {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: IDeleteModuleInput;
  }

  interface IDeleteModuleByIdOnMutationArguments {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: IDeleteModuleByIdInput;
  }

  interface IDeleteModuleByNameAndOrganizationNameAndProjectNameOnMutationArguments {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: IDeleteModuleByNameAndOrganizationNameAndProjectNameInput;
  }

  interface IUpsertModuleOnMutationArguments {
    /**
     * The exclusive input argument for this mutation. An object type, make sure to see documentation for this object’s fields.
     */
    input: IUpsertModuleInput;
  }

  /**
   * All input for the create `Module` mutation.
   */
  interface ICreateModuleInput {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: string | null;

    /**
     * The `Module` to be created by this mutation.
     */
    module: IModuleInput;
  }

  /**
   * An input for mutations affecting `Module`
   */
  interface IModuleInput {
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
    latestRelease?: string | null;
    licenseSpdxId?: string | null;
  }

  /**
   * The output of our create `Module` mutation.
   */
  interface ICreateModulePayload {
    __typename: 'CreateModulePayload';

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId: string | null;

    /**
     * The `Module` that was created by this mutation.
     */
    module: IModule | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query: IQuery | null;

    /**
     * An edge for our `Module`. May be used by Relay 1.
     */
    moduleEdge: IModulesEdge | null;
  }

  interface IModuleEdgeOnCreateModulePayloadArguments {
    /**
     * The method to use when ordering `Module`.
     * @default {"alias":"primary_key_asc","specs":[["name",true],["organization_name",true],["project_name",true]],"unique":true}
     */
    orderBy?: Array<ModulesOrderBy> | null;
  }

  /**
   * All input for the `updateModule` mutation.
   */
  interface IUpdateModuleInput {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: string | null;

    /**
     * The globally unique `ID` which will identify a single `Module` to be updated.
     */
    nodeId: string;

    /**
     * An object where the defined keys will be set on the `Module` being updated.
     */
    modulePatch: IModulePatch;
  }

  /**
   * Represents an update to a `Module`. Fields that are set will be updated.
   */
  interface IModulePatch {
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
    latestRelease?: string | null;
    licenseSpdxId?: string | null;
  }

  /**
   * The output of our update `Module` mutation.
   */
  interface IUpdateModulePayload {
    __typename: 'UpdateModulePayload';

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId: string | null;

    /**
     * The `Module` that was updated by this mutation.
     */
    module: IModule | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query: IQuery | null;

    /**
     * An edge for our `Module`. May be used by Relay 1.
     */
    moduleEdge: IModulesEdge | null;
  }

  interface IModuleEdgeOnUpdateModulePayloadArguments {
    /**
     * The method to use when ordering `Module`.
     * @default {"alias":"primary_key_asc","specs":[["name",true],["organization_name",true],["project_name",true]],"unique":true}
     */
    orderBy?: Array<ModulesOrderBy> | null;
  }

  /**
   * All input for the `updateModuleById` mutation.
   */
  interface IUpdateModuleByIdInput {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: string | null;

    /**
     * An object where the defined keys will be set on the `Module` being updated.
     */
    modulePatch: IModulePatch;
    id: number;
  }

  /**
   * All input for the `updateModuleByNameAndOrganizationNameAndProjectName` mutation.
   */
  interface IUpdateModuleByNameAndOrganizationNameAndProjectNameInput {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: string | null;

    /**
     * An object where the defined keys will be set on the `Module` being updated.
     */
    modulePatch: IModulePatch;
    name: string;
    organizationName: string;
    projectName: string;
  }

  /**
   * All input for the `deleteModule` mutation.
   */
  interface IDeleteModuleInput {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: string | null;

    /**
     * The globally unique `ID` which will identify a single `Module` to be deleted.
     */
    nodeId: string;
  }

  /**
   * The output of our delete `Module` mutation.
   */
  interface IDeleteModulePayload {
    __typename: 'DeleteModulePayload';

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId: string | null;

    /**
     * The `Module` that was deleted by this mutation.
     */
    module: IModule | null;
    deletedModuleId: string | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query: IQuery | null;

    /**
     * An edge for our `Module`. May be used by Relay 1.
     */
    moduleEdge: IModulesEdge | null;
  }

  interface IModuleEdgeOnDeleteModulePayloadArguments {
    /**
     * The method to use when ordering `Module`.
     * @default {"alias":"primary_key_asc","specs":[["name",true],["organization_name",true],["project_name",true]],"unique":true}
     */
    orderBy?: Array<ModulesOrderBy> | null;
  }

  /**
   * All input for the `deleteModuleById` mutation.
   */
  interface IDeleteModuleByIdInput {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: string | null;
    id: number;
  }

  /**
   * All input for the `deleteModuleByNameAndOrganizationNameAndProjectName` mutation.
   */
  interface IDeleteModuleByNameAndOrganizationNameAndProjectNameInput {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: string | null;
    name: string;
    organizationName: string;
    projectName: string;
  }

  /**
   * All input for the upsert `Module` mutation.
   */
  interface IUpsertModuleInput {
    /**
     * An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client.
     */
    clientMutationId?: string | null;

    /**
     * The `Module` to be upserted by this mutation.
     */
    module: IModuleInput;
  }

  /**
   * The output of our upsert `Module` mutation.
   */
  interface IUpsertModulePayload {
    __typename: 'UpsertModulePayload';

    /**
     * The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations.
     */
    clientMutationId: string | null;

    /**
     * The `Module` that was upserted by this mutation.
     */
    module: IModule | null;

    /**
     * Our root query field type. Allows us to run any query from our mutation payload.
     */
    query: IQuery | null;

    /**
     * An edge for our `Module`. May be used by Relay 1.
     */
    moduleEdge: IModulesEdge | null;
  }

  interface IModuleEdgeOnUpsertModulePayloadArguments {
    /**
     * The method to use when ordering `Module`.
     * @default {"alias":"primary_key_asc","specs":[["name",true],["organization_name",true],["project_name",true]],"unique":true}
     */
    orderBy?: Array<ModulesOrderBy> | null;
  }
}

// tslint:enable
