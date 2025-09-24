import { ApolloServer } from "apollo-server-micro";
import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Product { id: ID!, name: String!, price: Int! }
  type Query {
    productIds(tenantId: ID!): [ID!]!
    product(id: ID!): Product
  }
`;

const PRODUCTS = Array.from({length: 2000}, (_,i)=>({ id: `p${i}`, name:`N${i}`, price:i }));

const resolvers = {
  Query: {
    productIds: async (_: any, { tenantId }: any) => {
      return PRODUCTS.map(p => p.id);
    },
    product: async (_: any, { id }: any) => {
      await new Promise(r => setTimeout(r, 15));
      return PRODUCTS.find(p => p.id === id);
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
export const config = { api: { bodyParser: false } };
export default server.createHandler({ path: "/api/graphql" });

