import dynamic from 'next/dynamic';

const DynamicGame = dynamic(() => import('./game'), {
  ssr: false,
});

export default function Home() {
  return <DynamicGame />;
}
