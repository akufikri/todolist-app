import { Button } from "@/components/ui/button"
import {
      Card,
      CardContent,
      CardDescription,
      CardHeader,
      CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { useRegister } from "@/hooks/Auth" // Pastikan path ini benar

export default function Register() {
      const {
            name,
            setName,
            email,
            setEmail,
            password,
            setPassword,
            loading,
            handleRegister
      } = useRegister();

      return (
            <div className="w-full h-screen flex items-center justify-center">
                  <Card className="mx-auto max-w-sm">
                        <CardHeader>
                              <CardTitle className="text-xl">Daftar</CardTitle>
                              <CardDescription>
                                    Masukkan informasi Anda untuk membuat akun
                              </CardDescription>
                        </CardHeader>
                        <CardContent>
                              <form onSubmit={handleRegister}>
                                    <div className="grid gap-4">
                                          <div className="grid gap-2">
                                                <div className="grid gap-2">
                                                      <Label htmlFor="name">Nama</Label>
                                                      <Input
                                                            id="name"
                                                            placeholder="Budi"
                                                            required
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                      />
                                                </div>
                                          </div>
                                          <div className="grid gap-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                      id="email"
                                                      type="email"
                                                      placeholder="budi@contoh.com"
                                                      required
                                                      value={email}
                                                      onChange={(e) => setEmail(e.target.value)}
                                                />
                                          </div>
                                          <div className="grid gap-2">
                                                <Label htmlFor="password">Kata Sandi</Label>
                                                <Input
                                                      id="password"
                                                      type="password"
                                                      value={password}
                                                      onChange={(e) => setPassword(e.target.value)}
                                                />
                                          </div>

                                          <Button type="submit" className="w-full" disabled={loading}>
                                                {loading ? "Mendaftar..." : "Buat Akun"}
                                          </Button>
                                    </div>
                              </form>
                              <div className="mt-4 text-center text-sm">
                                    Sudah punya akun?{" "}
                                    <Link to="/masuk" className="underline">
                                          Masuk
                                    </Link>
                              </div>
                        </CardContent>
                  </Card>
            </div>
      )
}