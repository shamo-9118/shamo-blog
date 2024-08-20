import Image from 'next/image';

type ArticleData = {
  retucontent: string;
  time: string;
  title: string;
  category: string;
};

type CardProps = {
  key: string;
  articleData: ArticleData;
};

export const Card = (props: CardProps) => {
  return (
    <div className='bg-[#ffffffe6] px-7 py-5 space-y-2 group'>
      <time dateTime='2024/08/12' className='text-sm'>
        {props.articleData.time}
      </time>
      <div className='space-y-2 group-hover:opacity-60 duration-150'>
        <h2 className='text-xl font-bold'>{props.articleData.title}</h2>
        <div className='flex justify-between'>
          <ul className='flex items-center gap-3 text-[#969696] text-xs font-light'>
            <li className='flex'>
              <Image width={14} height={14} src='/images/tag.svg' alt='tag' />
              <span className='translate-x-[-2px]'>
                {props.articleData.category}
              </span>
            </li>
          </ul>
          <div className='relative group-hover:translate-x-1 duration-200'>
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
