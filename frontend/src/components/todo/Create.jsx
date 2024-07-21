import { Label } from "@radix-ui/react-dropdown-menu";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { CardTitle } from "../ui/card";
import { useNavigate } from "react-router-dom";
import { useTodos } from "@/hooks/Todo";
import { useState } from "react";

export function Create() {
      const navigate = useNavigate();
      const { createTodo } = useTodos();
      const [title, setTitle] = useState('');
      const [description, setDescription] = useState('');

      const backToTodo = () => {
            navigate('/');
      };

      const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                  await createTodo({ title, description });
                  navigate('/');
            } catch (err) {
                  console.error('Failed to create todo:', err);
            }
      };

      return (
            <div>
                  <div className="mb-3">
                        <CardTitle>✏️ Apa aktifitas mu harini ?</CardTitle>
                  </div>
                  <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                              <div className="mb-1">
                                    <Label>Judul</Label>
                              </div>
                              <Input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                              />
                        </div>
                        <div className="mb-3">
                              <div className="mb-1">
                                    <Label>Deskripsi</Label>
                              </div>
                              <Textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                              />
                        </div>
                        <div className="flex items-center gap-3">
                              <Button type="submit" className="tracking-wide w-24 text-lg">Buat</Button>
                              <Button onClick={backToTodo} type="button" className="tracking-wide w-24 text-lg" variant="secondary">Batal</Button>
                        </div>
                  </form>
            </div>
      );
}