import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";


export default function Notfound() {
      const navigate = useNavigate();
      const backToHome = () => {
            navigate('/');
      }
      return (
            <div className="h-screen w-full flex items-center justify-center">
                  <Card className="w-full max-w-xl">
                        <CardHeader className="items-center">
                              <CardTitle className="text-[80px]">Oopss!</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-center">
                              <CardTitle>Halaman tidak di temukan</CardTitle>
                              <span>Halaman ini mungkin rusak atau di hapus..</span>
                        </CardContent>
                        <CardFooter className="justify-center">
                              <Button onClick={backToHome}>Kembali</Button>
                        </CardFooter>
                  </Card>
            </div>
      )
}