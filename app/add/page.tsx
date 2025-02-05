"use client";

import { Progress } from "@/components/ui/progress";
import React from "react";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

export default function Add() {
  const [progress, setProgress] = React.useState(0);
  const [confetti, setConfetti] = React.useState(false);
  const [confettiFired, setConfettiFired] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) {
          return prevProgress + 10;
        } else {
          if (!confetti && !confettiFired) {
            setConfetti(true);
            setConfettiFired(true);
          }
          return prevProgress;
        }
      });
    }, 100);

    if (progress === 100) {
      const timeout = setTimeout(() => {
        setConfetti(false);
        router.push("/");
      }, 1000);
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
    return () => clearInterval(interval);
  }, [confetti, progress, confettiFired, router]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <AlertDialog open={true}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>We just need a last thing :3</AlertDialogTitle>
            <AlertDialogDescription>
              To access your juice hours, we need a juice user token!
              <Link href="">How to get it?</Link>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <h1 className="mb-8 font-bold">Adding you ...</h1>
      <Progress className="w-1/2" value={progress} />
      {confetti && <Realistic autorun={{ speed: 1 }} />}
    </div>
  );
}
