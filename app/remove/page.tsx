"use client";

import { Progress } from "@/components/ui/progress";
import React from "react";
import Realistic from "react-canvas-confetti/dist/presets/realistic";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

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
        const slackcode = new URLSearchParams(window.location.search).get(
          "code",
        );

        fetch(
          `https://juicestats.spectralo.hackclub.app/api/remove?code=${slackcode}`,
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
  }, [confetti, progress, confettiFired, router]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="mb-8 font-bold">Removing you ...</h1>
        <Progress className="w-1/2" value={progress} />
        {confetti && <Realistic autorun={{ speed: 1 }} />}
      </div>
    </Suspense>
  );
}
