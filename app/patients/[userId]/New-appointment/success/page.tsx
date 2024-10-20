"use client"
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import { useEffect, useState } from "react";
import { number } from "zod";

const RequestSuccess = () => {
  const [userId, setUserId] = useState("")
  useEffect(() => {
    const path = window.location.pathname; 
    const pathParts = path.split('/');     
    const parseUserId = pathParts[2]; 
    setUserId(parseUserId);
  }, []);
  return (
    <div className=" flex h-screen">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/accests/icons/logo.svg"
            height={800}
            width={1000}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/accests/icons/correct-img.svg"
            height={150}
            width={220}
            alt="success"
          />
          <h2 className="header max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We&apos;ll be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-1">
            <Image
              src="/accests/icons/logo.svg"
              alt="doctor"
              width={100}
              height={80}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr.</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          {<Link href={`/patients/${userId}/dashboard`}>
            Go To Dashboard
          </Link>}
        </Button>
      </div>
    </div>
  );
};

export default RequestSuccess;