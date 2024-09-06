"use client";
import withAuth from "@/hoc/withAuth";
import axios from "axios";
import { Edit, House, Mail, Phone, User } from "lucide-react";
import React, { useEffect, useState } from "react";

function page() {
  const [tenant, setTenant] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [Hover, setHover] = useState(-1);
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:3001/tenants", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTenant(response.data);
        console.log(">>>>>>", response.data);
        setLoad(true);
      } catch (err) {
        setError("Failed to fetch properties");
        console.error(err);
      }
    };

    fetchProperties();
  }, []);
  const [load, setLoad] = useState(false);

  return (
    load && (
      <div className="w-full h-full flex flex-col gap-[20px] text-black">
        {tenant.map((item, index) => (
          <div className="w-full bg-white rounded-[5px] flex flex-col p-[20px]">
            <div className="w-full flex justify-between items-center h-[50px]">
              <div className="flex w-[80%] items-center  gap-[50px]">
                <div className=" flex gap-2 items-center w-[20%]">
                  <User />
                  <p>{item.name}</p>
                </div>
                <div className=" flex gap-2 items-center w-[20%]">
                  <Mail />
                  <p>{item.email}</p>
                </div>
                <div className=" flex gap-2 items-center w-[20%]">
                  <Phone />
                  <p>{item.phone}</p>
                </div>
                <div className=" flex gap-2 items-center w-[20%]">
                  <House />
                  <p>{item.section}</p>
                </div>
              </div>
              <div>
                <Edit />
              </div>
            </div>
            <div>
              {
                item.payments.lenght > 0 ?
                <div>hello</div>
                :
                <div>not payment yet</div>
              }
            </div>
          </div>
        ))}
      </div>
    )
  );
}

export default withAuth(page);
