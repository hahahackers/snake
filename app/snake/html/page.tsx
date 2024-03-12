import dynamic from 'next/dynamic';

const DynamicGame = dynamic(() => import('../html/html-renderer'), {
  ssr: false,
});

export default function Home() {
  return <DynamicGame />;
}
