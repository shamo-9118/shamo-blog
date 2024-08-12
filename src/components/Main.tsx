import { Heading } from '@/components/Heading';
import { Card } from '@/components/Card';

export const Main = () => {
  return (
    <main className='bg-[#f5f5f5] min-h-[100vh]'>
      <div className='max-w-[780px] mx-auto pt-[100px] pb-8'>
        <Heading>Blog</Heading>
      </div>
      <div className='max-w-[780px] mx-auto'>
        <Card></Card>
      </div>
    </main>
  );
};
