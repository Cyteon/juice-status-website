import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col max-h-full min-h-screen w-full justify-between items-center">
      <div className="flex flex-col items-center p-10 w-full max-w-2xl">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8 mt-16">
          Juice Slack Status
        </h1>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Add yourself :3</CardTitle>
            <CardDescription>
              Just authorize the app and youll be good to go!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="https://slack.com/oauth/v2/authorize?scope=&amp;user_scope=users.profile%3Awrite&amp;redirect_uri=https%3A%2F%2Fjuicestats.spectralo.hackclub.app%2Fadd&amp;client_id=2210535565.8399992850705">
                Login
              </Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="w-full max-w-md mt-4">
          <CardHeader>
            <CardTitle>Remove yourself :/</CardTitle>
            <CardDescription>
              Just authorize the app another time to remove you!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="https://slack.com/oauth/v2/authorize?scope=&amp;user_scope=users.profile%3Awrite&amp;redirect_uri=https%3A%2F%2Fjuicestats.spectralo.hackclub.app%2Fremove&amp;client_id=2210535565.8399992850705">
                Remove me
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="p-4 w-full text-start ">
        <p className="font-bold">Made by spc :3</p>
      </div>
    </div>
  );
}
