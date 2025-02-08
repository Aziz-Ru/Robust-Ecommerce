// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useState } from "react";
// import { addTodo, getTodos } from "./components/api/api";
// import { Todo } from "./components/utils/types";

// function App() {
//   const [title, setTitle] = useState("");
//   const [body, setBody] = useState("");

//   const queryClient = useQueryClient();
//   const {
//     data,
//     error,
//     isLoading,
//     // refetch: postRefetch,
//   } = useQuery<Todo[]>({
//     queryKey: ["todos"],
//     queryFn: getTodos,
//   });

//   const { mutate, isSuccess } = useMutation({
//     mutationFn: addTodo,
//     onSuccess: () => {
//       // postRefetch();
//       queryClient.invalidateQueries({
//         queryKey: ["todos"],
//       });
//     },
//   });

//   // useEffect(() => {
//   //   if (isSuccess) {
//   //     console.log("refetching");
//   //     postRefetch();
//   //   }
//   // }, [isSuccess, postRefetch]);

//   return (
//     <>
//       <h1>Todos</h1>
//       <div className="flex flex-col space-y-2 w-60">
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             mutate({
//               title,
//               body,
//             });
//           }}
//         >
//           <input
//             type="text"
//             name="title"
//             className="border border-gray-800 p-2 rounded"
//             placeholder="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//           <input
//             type="text"
//             name="body"
//             className="border border-gray-800 p-2 rounded"
//             placeholder="body"
//             value={body}
//             onChange={(e) => setBody(e.target.value)}
//           />
//           <button
//             className="bg-blue-500 text-white p-2 rounded"
//             onClick={() => {
//               setTitle("");
//               setBody("");
//             }}
//           >
//             Add Todo
//           </button>
//         </form>
//       </div>
//       {isSuccess && <p>Todo added successfully</p>}
//       {isLoading && <p>Loading...</p>}
//       {error && <p>Error: {error.message}</p>}

//       {data && (
//         <ul>
//           {data.map((todo) => (
//             <li key={todo.id}>
//               {todo.title} - {todo.completed ? "Completed" : "Not completed"}
//             </li>
//           ))}
//         </ul>
//       )}
//     </>
//   );
// }

// export default App;
