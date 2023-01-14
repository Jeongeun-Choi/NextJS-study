import fs from 'fs/promises'; // React 앱 코드가 준비됐을때 NextJS 측에선 해당 코드를 삭제한다.
import path from 'path';

function ProduceDetailPage(props) {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), 'dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();

  const product = data.products.find(product => product.id === productId);

  if (!product) {
    return { notFound: true };
  }
  return {
    props: {
      loadedProduct: product
    }
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map(product => product.id);

  const pathsWithParams = ids.map(id => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    fallback: false // true의 경우 몇개의 페이지만 사전 생성 할 수 있도록 한다.
  };
}

export default ProduceDetailPage;
