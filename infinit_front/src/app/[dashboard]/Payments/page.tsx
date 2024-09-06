"use client";
import withAuth from "@/hoc/withAuth";
import axios from "axios";
import { Check, CloudSnow, Edit, HandCoins, House, Mail, Phone, Pyramid, User } from "lucide-react";
import React, { useEffect, useState } from "react";

function page() {
  const [tenant, setTenant] = useState<any[]>([]);
  const [thisMounth, setThisMounth] = useState(false);
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
        setLoad(true);
      } catch (err) {
        setError("Failed to fetch properties");
        console.error(err);
      }
    };

    fetchProperties();
  }, []);
  const [load, setLoad] = useState(false);
  const pay = async (paymentId: number) => {
    try {
      const response = await axios.put(`http://localhost:3001/payments/${paymentId}`, {
        settled: true,
        datePaid: new Date(),
      });
      console.log('Payment updated:', response.data);
      // Trigger UI update or refetch payments here
    } catch (err) {
      console.error('Error updating payment:', err);
    }
  };
  return (
    load && (
      <div className="w-full h-full flex flex-col gap-[20px] text-black">
        {tenant.map((item, index) => (
          <div className="w-full bg-white rounded-[5px] flex flex-col p-[20px]">
            <h1 className="font-[600] text-[30px]">Tenant Info</h1>
            <div className="w-full flex justify-between items-center h-[50px]">
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
            <h1 className="font-[600] text-[30px]">make Payment</h1>

              {
                item.payments.length > 0 ?
                <div className="">
                    {
                        item.payments.map((i:any, index:number)=>(
                            <div onClick={() => pay(i.id)}  className={`flex flex-col gap-y-[20px] font-[600] text-white py-[5px] items-center w-[60px] px-[10px] ${i.settled ? "bg-green-500" : "bg-red-500" } bg-green-500 rounded-[6px]`}>
                                <p>{i.monthName.slice(0,3)}</p>
                                {
                                item.settled ?
                                <Check/>:
                                <HandCoins/>
                                }
                            </div>
                        ))
                    }
                </div>
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
