import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="max-h-full min-h-screen">
      <div className="flex flex-col items-center dark ml-96 mr-96 p-20">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
          Juice Slack Status
        </h1>
        <Card className="align-middle m-4 justify-center w-1/2">
          <CardHeader>
            <CardTitle>Add yourself :3</CardTitle>
            <CardDescription>
              Just authorize the app and you'll be good to go!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Authorize</Button>
          </CardContent>
        </Card>
        <Card className="align-middle m-4 justify-center w-1/2">
          <CardHeader>
            <CardTitle>Remove yourself :/</CardTitle>
            <CardDescription>
              Just authorize the app another time to remove you!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Remove me</Button>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col pr-6 pl-6 pb-4 align-bottom justify-end mt-2">
        <p>Made by spc :3</p>
      </div>
    </div>
  );
}
