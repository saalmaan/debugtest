import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

const PRODUCT_IDS = gql`query($tenantId: ID!) { productIds(tenantId:$tenantId) }`;
const PRODUCT = gql`query($id: ID!) { product(id:$id){ id name price } }`;

export default function ProductList({ client, tenantId }: any) {
  const { data } = useQuery(PRODUCT_IDS, { variables: { tenantId }, client });

  if (!data) return <div>Loading…</div>;

  return (
    <ul>
      {data.productIds.map((id: string) => {
        const { data: item } = useQuery(PRODUCT, { variables: { id }, client });
        return (
          <li>
            <span>{item?.product.name}</span>
            <button onClick={() => console.log(id)}>Select</button>
          </li>
        );
      })}
    </ul>
  );
}

