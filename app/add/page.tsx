"use client";

import { Progress } from "@/components/ui/progress";
import React from "react";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { Suspense } from "react";
import { Input } from "@/components/ui/input";

export default function Add() {
  const [progress, setProgress] = React.useState(0);
  const [confetti, setConfetti] = React.useState(false);
  const [confettiFired, setConfettiFired] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(true);
  const [juiceToken, setJuiceToken] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    if (!dialogOpen) {
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
          console.log(
            "Sending request with this code:",
            new URLSearchParams(window.location.search).get("code"),
          );
          const slackcode = new URLSearchParams(window.location.search).get(
            "code",
          );
          fetch(
            `https://juicestats.spectralo.hackclub.app/api/add?code=${slackcode}&juice=${juiceToken}`,
            {
              method: "POST",
            },
          ).then(() => {
            setConfettiFired(false);
            router.push("/");
          });
        }, 1000);
        return () => {
          clearInterval(interval);
          clearTimeout(timeout);
        };
      }
      return () => clearInterval(interval);
    }
  }, [confetti, progress, confettiFired, router, dialogOpen, juiceToken]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <AlertDialog open={dialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>We just need a last thing :3</AlertDialogTitle>
              <AlertDialogDescription>
                To access your juice hours, we need a juice user token! <br />
                <Link
                  className="underline decoration-wavy"
                  href="https://github.com/Spectralo/juice-status-website/blob/main/TOKEN.md"
                >
                  How to get it?
                </Link>
                <Input
                  className="mt-4"
                  placeholder="Paste your token here"
                  value={juiceToken}
                  onChange={(e) => setJuiceToken(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                onClick={() => {
                  if (juiceToken !== "") {
                    setDialogOpen(false);
                  }
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <h1 className="mb-8 font-bold">Adding you ...</h1>
        <Progress className="w-1/2" value={progress} />
        {confetti && <Realistic autorun={{ speed: 1 }} />}
      </div>
    </Suspense>
  );
}
