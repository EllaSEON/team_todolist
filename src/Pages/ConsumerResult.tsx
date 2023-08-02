import mockTodoList from "../Mock/mockTodolist";
import ResultPostItem from "../Component/ResultPostItem";
import CommonLayout from "../Component/CommonLayout";

function ConsumerResult() {
  return (
    <div className="bg-main_skyblue flex flex-col justify-center items-center h-screen ">
      <CommonLayout title={"a list of todays'work"}>
        {mockTodoList.map((postIt) => {
          return (
            <ResultPostItem key={postIt.id} timeTypes={postIt.todo.slice(-1)}>
              {postIt.todo.slice(0, -1)}
            </ResultPostItem>
          );
        })}
      </CommonLayout>
    </div>
  );
}

export default ConsumerResult;
