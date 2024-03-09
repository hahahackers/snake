import dynamic from 'next/dynamic';

const DynamicSnake = dynamic(() => import('./snake'), {
  ssr: false,
});

export default function Page() {
  return <DynamicSnake />;
}
