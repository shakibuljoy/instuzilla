"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const [params, setParams] = React.useState({
    trx_id: "",
    amount: "",
    status: "",
    detail: "",
  });

  const class_name =
    searchParams.get("status") === "success"
      ? "text-green-500"
      : "text-red-500";

  useEffect(() => {
    const trx_id = searchParams.get("trx_id");
    const amount = searchParams.get("amount");
    const status = searchParams.get("status");
    const detail = searchParams.get("detail");
    setParams({
      trx_id: Array.isArray(trx_id) ? trx_id[0] : trx_id,
      amount: Array.isArray(amount) ? amount[0] : amount,
      status: Array.isArray(status) ? status[0] : status,
      detail: Array.isArray(detail) ? detail[0] : detail,
    });
  }, [searchParams]);

  return (
    <div className="w-full md:w-[280px] mx-auto mt-12 " >
      <Card className={`${class_name}`}>
        <CardHeader>
          <CardTitle>Payment Status</CardTitle>
          <CardDescription>Online Payment Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Transaction ID: {params.trx_id}</p>
          <p>Amount: {params.amount}</p>

          <p>Detail: {params.detail}</p>
        </CardContent>
        <CardFooter>
          <p>Status: {params.status}</p>
        </CardFooter>
      </Card>
    </div>
  );
}
