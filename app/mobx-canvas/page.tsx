import dynamic from 'next/dynamic';

const DynamicGame = dynamic(() => import('./canvas-renderer'), {
  ssr: false,
});

export default function Home() {
  return <DynamicGame />;
}
