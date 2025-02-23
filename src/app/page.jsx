"use client";

import "reactflow/dist/style.css";

import ConfigurationPannel from "@/components/Custom/ConfigurationPannel";
import FlowDiagram from "@/components/Custom/FlowDiagram";
import { Card } from "@/components/ui/card";
import { FileCode2 } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GraphRequest } from "./API/PostGraphRequest";
import { rightPannelData } from "./API/postRightPannelRequest";

export default function Home() {
  const [selectedNode, setSelectedNode] = useState();

  const graphData=useQuery({
    queryKey:["graph"],
    queryFn:()=>GraphRequest,
  })


  const configurationPannel=useQuery({
    queryKey:['configurationPannel'+selectedNode?.id],
    queryFn:()=>rightPannelData
  })
  
  return (
      <div className="flex h-full bg-background">
        <main className="flex-1 w-full bg-[#363636] text-white h-full">
          <div className="grid grid-cols-12 h-full">
            <Card className="lg:col-span-9 md:col-span-8 col-span-6 h-full bg-[#181E25]">
              <div style={{ width: "100%", height: "100%" }}>
                <FlowDiagram
                  selectedNode={selectedNode}
                  setSelectedNode={setSelectedNode}
                  data={graphData.data}
                />
              </div>
            </Card>
            <ConfigurationPannel selectedNode={selectedNode}  data={configurationPannel}/>
          </div>
        </main>
      </div>
  );
}
