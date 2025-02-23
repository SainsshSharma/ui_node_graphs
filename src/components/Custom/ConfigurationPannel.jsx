"use client";

import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SquareArrowOutUpRight } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

function ConfigurationPannel({ selectedNode, data }) {
  const [selectedDeps, setSelectedDeps] = useState({});
  const [dbConfig, setDbConfig] = useState({
    user: "",
    password: "",
    hostname: "",
  });
  const [mockDatabase, setMockDatabase] = useState({
    "I want to mock databases": false,
    "I don't want to mock database": true,
  });

  useEffect(() => {
    if (data && Array.isArray(data.data)) {
      const initialDeps = data?.data?.reduce((acc, dep) => {
        acc[dep] = false;
        return acc;
      }, {});
      setSelectedDeps(initialDeps);
    }
  }, [data]);

  const postDataMutation=useMutation({
    mutationFn:async(data)=>await fetch('https://dummyApi/post', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  })

  const handleDbConfigChange = (field) => (e) => {
    setDbConfig((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleDependencyChange = (dep, checked) => {
    setSelectedDeps((prev) => ({
      ...prev,
      [dep]: checked,
    }));
  };

  const handleMockDatabaseChanges = (dep, checked) => {
    setMockDatabase((prev) =>
      Object.keys(prev).reduce(
        (acc, key) => ({
          ...acc,
          [key]: key === dep ? checked : false, 
        }),
        {}
      )
    );
  };

  const sendResponse=()=>{
    
    const data={
      "flow":selectedNode?.data.label,
      "entities_to_mock":[Object.keys(selectedDeps).filter(i=>selectedDeps[i] && i)],
      "is_db_mocked":mockDatabase['I want to mock databases']?true:false,
      "db_config":{
        "username":dbConfig.user,
        "password":dbConfig.password,
        "hostname":dbConfig.hostname
      }
    }
    postDataMutation.mutate(data)
  }
  
  return (
    <Card className="lg:col-span-3 md:col-span-4 col-span-5 w-full h-[calc(100vh-12rem)]  border-[#595858] border-t">
      <div className="p-6 ">
        <h2 className="text-lg font-medium">
          {selectedNode?.data.label.split(":").at(-1).split(".").at(-1)}
        </h2>
        <div className="flex flex-col gap-2 mt-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1 ">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            Last 2 commits scanned
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            {selectedNode?.data?.childNodesLength} entry points identified
          </span>
        </div>
      </div>

      <ScrollArea className="h-[calc(100%-5rem)] px-6 pb-6 ">
        <div className="space-y-6">
          <div>
            <h3 className="text-[16px] font-medium mb-3 ">Selected flow</h3>
            <Select defaultValue="post">
              <SelectTrigger>
                <SelectValue placeholder="Select flow" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="post">
                  {selectedNode?.data?.label}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <h3 className="text-[16px] font-medium">Dependencies</h3>
            <p className="text-[14px] text-muted-foreground mb-2 ">
              Select the ones you want to mock
            </p>
            <div className="space-y-3">
              {Object.keys(selectedDeps).map((dep,key) => (
                <div className="flex w-full justify-between items-center" key={key}>
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={dep}
                      checked={selectedDeps[dep] || false}
                      onCheckedChange={(checked) =>
                        handleDependencyChange(dep, checked)
                      }
                      className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 border-gray-500"
                    />
                    <label
                      htmlFor={dep}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {dep}
                    </label>
                  </div>
                  <SquareArrowOutUpRight size={13} color="#FF7A00" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-[16px] font-medium">Database</h3>
            <p className="text-[14px] text-muted-foreground mb-2 ">
              Select if you want to mock database
            </p>
            <div className="space-y-3">
              {Object.keys(mockDatabase).map((dep, key) => (
                <div className="flex w-full justify-between items-center" key={key}>
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={mockDatabase[dep] || false}
                      onCheckedChange={(checked) =>
                        handleMockDatabaseChanges(dep, checked)
                      }
                      className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 border-gray-500"
                    />
                    <label
                      htmlFor={dep}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {dep}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-3">
              Database Configurations
            </h3>
            <div className="space-y-4">
              <div className="relative w-full">
                <label className="absolute -top-2 left-2 bg-[#363636] text-[14px] px-1 text-xs text-gray-400">
                  Database User
                </label>
                <Input
                  placeholder="postgres"
                  value={dbConfig.user}
                  onChange={handleDbConfigChange("user")}
                  disabled={mockDatabase["I want to mock databases"]?true:false}
                  className="w-full border border-orange-400 bg-transparent px-3 py-2 text-white focus:outline-none focus:ring-0 focus:border-orange-400"
                />
              </div>

              <div className="relative w-full">
                <label className="absolute -top-2 left-2 bg-[#363636] text-[14px] px-1 text-xs text-gray-400">
                  Database Password
                </label>
                <Input
                  type="password"
                  value={dbConfig.password}
                  className="w-full border border-orange-400 bg-transparent px-3 py-2 text-white focus:outline-none focus:ring-0 focus:border-orange-400"
                  onChange={handleDbConfigChange("password")}
                  disabled={mockDatabase["I want to mock databases"]?true:false}

                />
              </div>
              <div className="relative w-full">
                <label className="absolute -top-2 left-2 bg-[#363636] text-[14px] px-1 text-xs text-gray-400">
                  Database Hostname
                </label>
                <Input
                  placeholder="localhost"
                  value={dbConfig.hostname}
                  className="w-full border border-orange-400 bg-transparent px-3 py-2 text-white focus:outline-none focus:ring-0 focus:border-orange-400"
                  onChange={handleDbConfigChange("hostname")}
                  disabled={mockDatabase["I want to mock databases"]?true:false}

                />
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
      <div className="pt-2 w-full flex justify-end items-center pr-2 border-[#595858] border-t ">
        <Button className="bg-blue-500 text-white" onClick={sendResponse}>Save</Button>
      </div>
    </Card>
  );
}

export default ConfigurationPannel;
