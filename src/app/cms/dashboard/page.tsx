import { auth, signOut } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut } from "lucide-react";
import Editor from "@/components/Editor";
import JournalList from "@/components/JournalList";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    return redirect("/cms/login");
  }

  return (
    <div className="container mx-auto">
      <Card className="bg-[#f6f2f6]">
        <CardHeader>
          <CardTitle className="text-2xl">CMS Dashboard</CardTitle>
          <CardDescription>
            Welcome, {session.user?.name}! Manage your blogs here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="blogs" className="w-full">
            <TabsList className="bg-[#ede]">
              <TabsTrigger value="blogs">Your Blogs</TabsTrigger>
              <TabsTrigger value="new">New Blog</TabsTrigger>
            </TabsList>
            <TabsContent value="blogs">
              <JournalList />
            </TabsContent>
            <TabsContent value="new">
              <Editor />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <form
            action={async () => {
              "use server";
              await signOut();
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
  );
}
