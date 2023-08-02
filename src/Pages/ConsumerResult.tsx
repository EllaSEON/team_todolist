import mockTodoList from "../Mock/mockTodolist";
import ResultPostItem from "../Component/ResultPostItem";
import CommonInnerLayout from "../Component/Layout/CommonInnerLayout";

function ConsumerResult() {
  return (
    <div className="bg-main_skyblue flex flex-col justify-center items-center h-screen ">
      <CommonInnerLayout title={"오늘 나 이만큼이나 했어😌"}>
        {mockTodoList.map((postIt) => {
          return (
            <ResultPostItem key={postIt.id} timeTypes={postIt.todo.slice(-1)}>
              {postIt.todo.slice(0, -1)}
            </ResultPostItem>
          );
        })}
      </CommonInnerLayout>
    </div>
  );
}

export default ConsumerResult;
