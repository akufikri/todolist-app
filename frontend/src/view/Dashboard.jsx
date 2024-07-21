import { Content } from "@/components/todo/Content";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
      const navigate = useNavigate();
      const create = () => {
            navigate('/create')
      }
      return (
            <>
                  <div className="flex items-center justify-between">
                        <h1 className="text-2xl">Todo</h1>
                        <Button onClick={create} className="rounded-full">Buat todo</Button>
                  </div>
                  <Content />
            </>
      )
}