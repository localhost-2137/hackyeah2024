import {Client} from '@elastic/elasticsearch';

declare global {
    var elasticSearch: Client | undefined;
}

export const elasticSearch = globalThis.elasticSearch || new Client({
    node: 'http://localhost:9200',
});

if (process.env.NODE_ENV !== "production") globalThis.elasticSearch = elasticSearch;

export namespace ElasticIndexes {
    export const UserIndex = 'user-idx';
}