import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useTodos } from "@/hooks/Todo";
import { useEffect, useState, useCallback, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";

export function Edit() {
      const { id } = useParams();
      const navigate = useNavigate();
      const { getTodo, updateTodo, shareTodo } = useTodos();
      const getTodoRef = useRef(getTodo);
      const [title, setTitle] = useState('');
      const [description, setDescription] = useState('');
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      const [email, setEmail] = useState('');

      useEffect(() => {
            const fetchTodo = async () => {
                  try {
                        const todo = await getTodoRef.current(id);
                        console.log("Fetched todo:", todo);
                        setTitle(todo.title);
                        setDescription(todo.description);
                        setLoading(false);
                  } catch (err) {
                        console.error("Error fetching todo:", err);
                        setError('Failed to fetch todo');
                        setLoading(false);
                  }
            };
            fetchTodo();
      }, []);

      const handleTitleChange = useCallback((e) => {
            console.log("Title changed:", e.target.value);
            setTitle(e.target.value);
      }, []);

      const handleDescriptionChange = useCallback((e) => {
            console.log("Description changed:", e.target.value);
            setDescription(e.target.value);
      }, []);

      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                  console.log("Submitting:", { title, description });
                  await updateTodo(id, { title, description });
                  navigate('/');
            } catch (err) {
                  console.error("Error updating todo:", err);
                  setError('Failed to update todo');
            }
      };

      const handleShare = async (e) => {
            e.preventDefault();
            try {
                  await shareTodo(id, email);
                  setEmail('');
            } catch (err) {
                  console.error("Error sharing todo:", err);
                  setError('Failed to share todo');
            }
      };

      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;

      return (
            <div className="grid grid-cols-1">
                  <Card>
                        <form onSubmit={handleSubmit}>
                              <CardHeader>
                                    <div className="flex justify-between items-center">
                                          <Input
                                                className="w-auto text-lg font-semibold"
                                                value={title}
                                                onChange={handleTitleChange}
                                                required
                                          />
                                          <div className="flex items-center gap-3">
                                                <Dialog>
                                                      <DialogTrigger asChild>
                                                            <Button>Bagikan</Button>
                                                      </DialogTrigger>
                                                      <DialogContent className="sm:max-w-[425px]">
                                                            <DialogHeader>
                                                                  <DialogTitle>Bagikan Tugas Anda</DialogTitle>
                                                                  <DialogDescription>
                                                                        Masukkan email pengguna untuk membagikan tugas ini.
                                                                  </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="grid gap-4 py-4">
                                                                  <div className="grid grid-cols-4 items-center gap-4">
                                                                        <Label htmlFor="email" className="text-right">
                                                                              E-mail
                                                                        </Label>
                                                                        <Input
                                                                              id="email"
                                                                              value={email}
                                                                              onChange={(e) => setEmail(e.target.value)}
                                                                              className="col-span-3"
                                                                        />
                                                                  </div>
                                                            </div>
                                                            <DialogFooter>
                                                                  <Button type="submit" onClick={handleShare}>Bagikan</Button>
                                                            </DialogFooter>
                                                      </DialogContent>
                                                </Dialog>
                                                <Button type="submit">Done</Button>
                                          </div>
                                    </div>
                              </CardHeader>
                              <CardContent>
                                    <Textarea
                                          value={description}
                                          onChange={handleDescriptionChange}
                                          required
                                    />
                              </CardContent>
                        </form>
                  </Card>
            </div>
      );
}
