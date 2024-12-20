
import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: "src/graphql/schema.graphql",
    documents: ["src/**/*.graphql"],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        './src/_generated_gql_/': {
            preset: 'client' ,
        }
    }
}

export default config