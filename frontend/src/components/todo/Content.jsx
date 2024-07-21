import { HiOutlineEllipsisHorizontal } from "react-icons/hi2";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useTodos } from "@/hooks/Todo";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function Content() {
      const { todos, sharedTodos, loading, error, deleteTodo, fetchTodos, getSharedTodo } = useTodos();
      const navigate = useNavigate();

      useEffect(() => {
            fetchTodos();
            getSharedTodo();
      }, []);

      if (loading) {
            return <div className="text-center text-2xl">Loading...</div>;
      }

      if (error) {
            return <div>Error: {error}</div>;
      }

      const renderTodoCard = (todo, isShared = false) => (
            <Card key={todo.id} className="rounded-2xl">
                  <CardHeader>
                        <div className="flex justify-between items-center">
                              <CardTitle>{todo.title}</CardTitle>
                              {!isShared && (
                                    <div>
                                          <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                      <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="overflow-hidden rounded-full"
                                                      >
                                                            <HiOutlineEllipsisHorizontal className="text-2xl" />
                                                      </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                      <DropdownMenuItem onClick={() => navigate(`/${todo.id}`)}>Edit</DropdownMenuItem>
                                                      <DropdownMenuItem onSelect={() => deleteTodo(todo.id)}>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                          </DropdownMenu>
                                    </div>
                              )}
                        </div>
                  </CardHeader>
                  <CardContent>
                        <p>{todo.description}</p>
                  </CardContent>
                  <CardFooter>
                        {isShared && <p className="text-sm text-gray-500">Shared by: {todo.shared_by}</p>}
                  </CardFooter>
            </Card>
      );


      return (
            <>
                  <div className="grid grid-cols-2 gap-8">
                        <div>
                              <h2 className="text-2xl font-bold mt-8 mb-4">My Todos</h2>
                              <div className="grid grid-cols-1 gap-4 mt-5">
                                    {todos.length > 0 ? (
                                          todos.map((todo) => renderTodoCard(todo))
                                    ) : (
                                          <div className="col-span-2 text-center mt-5">
                                                <p>No personal todos available</p>
                                          </div>
                                    )}
                              </div>
                        </div>

                        <div>
                              <h2 className="text-2xl font-bold mt-8 mb-4">Shared Todos</h2>
                              <div className="grid grid-cols-1 gap-4 mt-5">
                                    {sharedTodos.length > 0 ? (
                                          sharedTodos.map((todo) => renderTodoCard(todo, true))
                                    ) : (
                                          <div className="col-span-2 text-center mt-5">
                                                <p>No shared todos available</p>
                                          </div>
                                    )}
                              </div>
                        </div>
                  </div>
            </>
      );
}
