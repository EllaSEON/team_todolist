interface CommonLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  textSize?: string;
}

function CommonInnerLayout({
  children,
  title,
  description,
  textSize = "text-3xl",
}: CommonLayoutProps) {
  return (
    <section className="bg-main_bg_cloud max-w-7xl w-98 rounded-xl h-600 relative">
      <div className="sticky top-0 pb-5 rounded-t-xl bg-main_bg_cloud ">
        <h1
          className={` text-center pt-9 font-semibold tracking-wider ${textSize}`}
        >
          {title}
        </h1>
        {description && (
          <p className="font-mono text-center mt-3 text-lg">{description}</p>
        )}
      </div>
      <ul className="h-fit max-h-450 pt-4 pb-5 pr-10 pl-10 grid grid-cols-2 gap-4 overflow-y-scroll">
        {children}
      </ul>
    </section>
  );
}

export default CommonInnerLayout;
