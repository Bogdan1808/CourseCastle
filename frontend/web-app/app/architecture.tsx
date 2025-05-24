"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ArchitectureDiagram() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">CourseCastle Architecture</h2>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="frontend">Frontend (Next.js)</TabsTrigger>
          <TabsTrigger value="backend">Backend (.NET)</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="p-4">
          <div className="border border-stone-200 rounded-lg p-6 bg-stone-50">
            <h3 className="text-xl font-semibold mb-4">System Architecture</h3>
            <div className="flex flex-col items-center">
              <div className="w-full max-w-md p-4 bg-white border border-stone-200 rounded-lg mb-4">
                <h4 className="font-medium text-center mb-2">Client</h4>
                <div className="bg-stone-100 p-3 rounded text-center">Web Browser</div>
              </div>

              <div className="h-8 w-0.5 bg-stone-300"></div>

              <div className="w-full max-w-md p-4 bg-white border border-stone-200 rounded-lg mb-4">
                <h4 className="font-medium text-center mb-2">Frontend</h4>
                <div className="bg-black text-white p-3 rounded text-center">Next.js</div>
                <div className="mt-2 text-sm text-stone-600 text-center">React, TypeScript, Tailwind CSS</div>
              </div>

              <div className="h-8 w-0.5 bg-stone-300"></div>

              <div className="w-full max-w-md p-4 bg-white border border-stone-200 rounded-lg">
                <h4 className="font-medium text-center mb-2">Backend</h4>
                <div className="bg-[#512BD4] text-white p-3 rounded text-center">.NET API</div>
                <div className="mt-2 text-sm text-stone-600 text-center">C#, ASP.NET Core, Entity Framework</div>
              </div>

              <div className="h-8 w-0.5 bg-stone-300"></div>

              <div className="w-full max-w-md p-4 bg-white border border-stone-200 rounded-lg">
                <h4 className="font-medium text-center mb-2">Database</h4>
                <div className="bg-blue-600 text-white p-3 rounded text-center">SQL Server</div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="frontend" className="p-4">
          <div className="border border-stone-200 rounded-lg p-6 bg-stone-50">
            <h3 className="text-xl font-semibold mb-4">Next.js Frontend</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  1
                </span>
                <div>
                  <span className="font-medium">App Router</span>
                  <p className="text-sm text-stone-600">File-based routing system for creating pages and layouts</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  2
                </span>
                <div>
                  <span className="font-medium">Server Components</span>
                  <p className="text-sm text-stone-600">
                    React components that render on the server for improved performance
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  3
                </span>
                <div>
                  <span className="font-medium">API Routes</span>
                  <p className="text-sm text-stone-600">Serverless functions that connect to the .NET backend</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  4
                </span>
                <div>
                  <span className="font-medium">Tailwind CSS</span>
                  <p className="text-sm text-stone-600">Utility-first CSS framework for styling the UI</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-amber-500 text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  5
                </span>
                <div>
                  <span className="font-medium">shadcn/ui</span>
                  <p className="text-sm text-stone-600">Reusable UI components built with Radix UI and Tailwind</p>
                </div>
              </li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="backend" className="p-4">
          <div className="border border-stone-200 rounded-lg p-6 bg-stone-50">
            <h3 className="text-xl font-semibold mb-4">.NET Backend</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="bg-[#512BD4] text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  1
                </span>
                <div>
                  <span className="font-medium">ASP.NET Core Web API</span>
                  <p className="text-sm text-stone-600">RESTful API endpoints for course data and user management</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-[#512BD4] text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  2
                </span>
                <div>
                  <span className="font-medium">Entity Framework Core</span>
                  <p className="text-sm text-stone-600">ORM for database operations and data modeling</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-[#512BD4] text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  3
                </span>
                <div>
                  <span className="font-medium">Identity Server</span>
                  <p className="text-sm text-stone-600">Authentication and authorization for secure user access</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-[#512BD4] text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  4
                </span>
                <div>
                  <span className="font-medium">SQL Server Database</span>
                  <p className="text-sm text-stone-600">Relational database for storing course and user data</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="bg-[#512BD4] text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  5
                </span>
                <div>
                  <span className="font-medium">Azure Deployment</span>
                  <p className="text-sm text-stone-600">Cloud hosting for scalable and reliable backend services</p>
                </div>
              </li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
