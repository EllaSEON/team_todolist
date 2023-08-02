interface CommonLayoutProps {
  title: string;
  children: React.ReactNode;
}

function CommonLayout({ children, title }: CommonLayoutProps) {
  return (
    <section className="bg-main_bg_cloud max-w-7xl w-98 rounded-xl h-600 relative">
      <div className="sticky top-0 pb-5 rounded-t-xl bg-main_bg_cloud ">
        <h1 className=" text-center pt-9 text-3xl font-semibold ">{title}</h1>
      </div>
      <ul className="h-fit max-h-450 pt-11 pb-5 pr-10 pl-10 grid grid-cols-2 gap-4 overflow-y-scroll">
        {children}
      </ul>
    </section>
  );
}

export default CommonLayout;
