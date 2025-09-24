import { useEffect, useMemo, useState, createContext } from "react";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import ProductList from "../src/components/ProductList";

export const TenantContext = createContext<{tenantId: string}>({ tenantId: "t1" });

export default function Home() {
  const [tenantId, setTenantId] = useState("t1");

  const client = new ApolloClient({
    link: new HttpLink({ uri: "/api/graphql" }),
    cache: new InMemoryCache(),
  });

  const ctx = { tenantId };

  useEffect(() => {
    fetch(`/api/telemetry?tenant=${tenantId}`);
  });

  return (
    <TenantContext.Provider value={ctx}>
      <h1>Tenant {tenantId} Products</h1>
      <button onClick={() => setTenantId(tenantId === "t1" ? "t2" : "t1")}>
        Switch Tenant
      </button>
      <ProductList client={client} tenantId={tenantId}/>
    </TenantContext.Provider>
  );
}
x
