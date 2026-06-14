"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ProgressPage() {
  const [steps, setSteps] = useState<any[]>([]);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {

    const {
      data:{user}
    } = await supabase.auth.getUser();

    if(!user) return;

    const timeline = [
      {
        title:"Application Submitted",
        status:true
      },
      {
        title:"Task Submitted",
        status:true
      },
      {
        title:"Task Approved",
        status:false
      },
      {
        title:"Certificate Issued",
        status:false
      }
    ];

    setSteps(timeline);
  };

  return (

<div className="p-6">

<h1 className="text-3xl font-bold mb-8">
My Progress 🚀
</h1>

<div className="space-y-6">

{steps.map((step,index)=>(

<div
key={index}
className="flex items-center gap-4"
>

<div
className={`w-6 h-6 rounded-full ${
step.status
?"bg-green-500"
:"bg-gray-300"
}`}
/>

<div>

<h2 className="font-bold">
{step.title}
</h2>

<p className="text-gray-500">

{step.status
?"Completed"
:"Pending"}

</p>

</div>

</div>

))}

</div>

</div>

)
}