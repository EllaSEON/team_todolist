interface ResultPostItemProps {
  children: string;
  timeTypes: string;
}

function ResultPostItem({ children, timeTypes }: ResultPostItemProps) {
  return (
    <li className="font-semibold tracking-widest relative h-fit list-none">
      <div
        className={`${
          timeTypes === "1"
            ? "bg-post_red"
            : timeTypes === "2"
            ? "bg-post_yellow"
            : "bg-post_blue"
        } w-50 h-32 p-1 shadow shadow-black break-all`}
      >
        {children}
      </div>
    </li>
  );
}
export default ResultPostItem;
