"use client";
import React, { useEffect, useState } from "react";
import { DataTable } from "../common/customDataTable";
import { userColumn } from "./column";
import { CanteenData, UserData } from "@/types";
import { getAllUser } from "@/action-data/userAction";
import { useQuery } from "@tanstack/react-query";
import { PuffLoader } from "react-spinners";
import { getAllCanteen } from "@/action-data/canteenAction";
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};
const CanteenDataList = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["canteen"],
    queryFn: async () => {
      const data = await getAllCanteen();
      return data.data as CanteenData[];
    },
    staleTime: 0,
  });

  if (isLoading) {
    return (
      <div className="overflow-auto w-full h-[60vh] flex justify-center items-center">
        <PuffLoader className="text-theme text-[4px]" size={30} />
      </div>
    );
  }

  return (
    <div className=" w-full h-[75vh]">
      <DataTable searchName="name" data={data || []} columns={userColumn} />
    </div>
  );
};

export default CanteenDataList;
