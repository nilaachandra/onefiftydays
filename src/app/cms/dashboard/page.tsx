import { auth, signOut } from "@/app/lib/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Edit, LogOut, Plus } from "lucide-react"

// Simulated blog data
const blogs = [
  { id: 1, title: "Getting Started with Next.js", date: "2023-05-15" },
  { id: 2, title: "The Power of Server Components", date: "2023-06-02" },
  { id: 3, title: "Mastering Tailwind CSS", date: "2023-06-20" },
]

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    return redirect('/cms/login')
  }

  return (
    <div className="container mx-auto">
      <Card className="bg-[#f6f2f6]">
        <CardHeader>
          <CardTitle className="text-2xl">CMS Dashboard</CardTitle>
          <CardDescription>Welcome, {session.user?.name}! Manage your blogs here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="blogs" className="w-full">
            <TabsList className="bg-[#ede]">
              <TabsTrigger value="blogs">Your Blogs</TabsTrigger>
              <TabsTrigger value="new">New Blog</TabsTrigger>
            </TabsList>
            <TabsContent value="blogs">
              <div className="space-y-4">
                {blogs.map((blog) => (
                  <Card key={blog.id}>
                    <CardHeader>
                      <CardTitle>{blog.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <CalendarDays className="mr-2 h-4 w-4" />
                        {blog.date}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="default" className="w-full">
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="new">
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Blog Title</Label>
                  <Input id="title" placeholder="Enter your blog title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Blog Content</Label>
                  <textarea
                    id="content"
                    placeholder="Write your blog content here..."
                    className="w-full h-32 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                    rows={4}
                  ></textarea>
                </div>
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Create New Blog
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <form
            action={async () => {
              "use server"
              await signOut()
            }}
            className="w-full"
          >
            <Button type="submit" variant="default" className="w-full">
              <LogOut className="mr-2 h-4 w-4" /> Sign out
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}