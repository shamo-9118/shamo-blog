export const Header = () => {
  const navItems = ['about', 'history', 'work'];

  return (
    <header className='font-mono px-4'>
      <div className='flex items-end justify-between max-w-[780px] mx-auto pt-8 pb-2'>
        <p className='text-2xl'>Shamo</p>
        <nav>
          <ul className='flex gap-4 font-bold'>
            {navItems.map((navItem) => {
              return (
                <li
                  className='relative hover:text-[#aaa] hover:after:w-full hover:after:transform hover:after:-translate-x-1/2 after:content-[""] after:block after:absolute after:w-0 after:left-1/2 after:-translate-x-1/2 after:bg-[#fff] after:h-[3px] after:rounded-full after:duration-300 after:transition-all after:bottom-[-10px] hover:transition-all hover:after:bg-[#fe2811]'
                  key={navItem}
                >
                  {navItem}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};
