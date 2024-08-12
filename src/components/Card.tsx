import Image from 'next/image';

export const Card = () => {
  return (
    <div className='bg-[#ffffffe6] px-7 py-5 space-y-2 group'>
      <time dateTime='2024/08/12' className='text-sm'>
        2024/08/12
      </time>
      <div className='space-y-2 group-hover:opacity-60 duration-150'>
        <h2 className='text-xl font-bold'>
          今日からお盆だけど暑すぎてどうにもならない、、
        </h2>
        <div className='flex justify-between'>
          <ul className='flex items-center gap-3 text-[#969696] text-xs font-light'>
            <li className='before:content-["#"]'>日常</li>
          </ul>
          <div className='relative group-hover:translate-x-1 duration-300'>
            <div className='font-extralight group-hover:after:content-[""] group-hover:after:w-[90%] group-hover:after:transform after:block after:absolute after:w-0 after:h-[1px] after:duration-150 after:bg-[#fe2811] after:translate-x-[1px]'>
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
