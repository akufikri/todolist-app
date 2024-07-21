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
import { useLogin } from "@/hooks/Auth"

export default function Login() {
      const {
            email,
            setEmail,
            password,
            setPassword,
            loading,
            error,
            handlerLogin
      } = useLogin();

      return (
            <div className="w-full h-screen flex items-center justify-center">
                  <Card className="mx-auto max-w-sm">
                        <CardHeader>
                              <CardTitle className="text-2xl">Masuk</CardTitle>
                              <CardDescription>
                                    Masukkan email Anda di bawah untuk masuk ke akun Anda
                              </CardDescription>
                        </CardHeader>
                        <CardContent>
                              <form onSubmit={handlerLogin}>
                                    <div className="grid gap-4">
                                          <div className="grid gap-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                      id="email"
                                                      type="email"
                                                      placeholder="contoh@email.com"
                                                      required
                                                      value={email}
                                                      onChange={(e) => setEmail(e.target.value)}
                                                />
                                          </div>
                                          <div className="grid gap-2">
                                                <div className="flex items-center">
                                                      <Label htmlFor="password">Kata Sandi</Label>
                                                      <Link to="/lupa-password" className="ml-auto inline-block text-sm underline">
                                                            Lupa kata sandi?
                                                      </Link>
                                                </div>
                                                <Input
                                                      id="password"
                                                      type="password"
                                                      required
                                                      value={password}
                                                      onChange={(e) => setPassword(e.target.value)}
                                                />
                                          </div>
                                          <Button type="submit" className="w-full" disabled={loading}>
                                                {loading ? "Sedang Masuk..." : "Masuk"}
                                          </Button>
                                    </div>
                              </form>

                              <div className="mt-4 text-center text-sm">
                                    Belum punya akun?{" "}
                                    <Link to="/daftar" className="underline">
                                          Daftar
                                    </Link>
                              </div>
                        </CardContent>
                  </Card>
            </div>
      )
}