import Image from 'next/image';

export const Loading = () => {
  return (
    <div className='bg-[#ffffffe6] px-7 py-5 space-y-3'>
      <p className='h-4 max-w-16 w-full rounded-full bg-[#dedede]'></p>
      <div className='space-y-2'>
        <h2 className='h-6 max-w-[500px] w-full rounded-full bg-[#dedede]'></h2>
        <div className='flex justify-between'>
          <p className='flex items-center gap-3 bg-[#dedede] h-4 max-w-9 w-full rounded-full'></p>
          <div className='relative'>
            <div>
              <Image
                width={18}
                height={18}
                src='/images/right_arrow.svg'
                alt='right arrow'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
