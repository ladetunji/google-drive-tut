"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card, CardContent } from "~/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import {
  Folder,
  FileText,
  ImageIcon,
  Video,
  Music,
  Archive,
  Upload,
  Search,
  Grid3X3,
  List,
  MoreVertical,
  Download,
  Share,
  Trash2,
  Star,
  ChevronRight,
  Home,
} from "lucide-react"

// Mock data structure
const mockData = {
  id: "root",
  name: "My Drive",
  type: "folder",
  children: [
    {
      id: "documents",
      name: "Documents",
      type: "folder",
      children: [
        {
          id: "resume",
          name: "Resume.pdf",
          type: "file",
          fileType: "pdf",
          size: "2.4 MB",
          modified: "2 days ago",
          url: "https://example.com/resume.pdf",
        },
        {
          id: "presentation",
          name: "Project Presentation.pptx",
          type: "file",
          fileType: "presentation",
          size: "15.2 MB",
          modified: "1 week ago",
          url: "https://example.com/presentation.pptx",
        },
        {
          id: "work-folder",
          name: "Work Files",
          type: "folder",
          children: [
            {
              id: "report",
              name: "Monthly Report.docx",
              type: "file",
              fileType: "document",
              size: "1.8 MB",
              modified: "3 days ago",
              url: "https://example.com/report.docx",
            },
          ],
        },
      ],
    },
    {
      id: "photos",
      name: "Photos",
      type: "folder",
      children: [
        {
          id: "vacation1",
          name: "vacation-photo-1.jpg",
          type: "file",
          fileType: "image",
          size: "3.2 MB",
          modified: "1 month ago",
          url: "https://example.com/vacation1.jpg",
        },
        {
          id: "vacation2",
          name: "vacation-photo-2.jpg",
          type: "file",
          fileType: "image",
          size: "2.8 MB",
          modified: "1 month ago",
          url: "https://example.com/vacation2.jpg",
        },
      ],
    },
    {
      id: "videos",
      name: "Videos",
      type: "folder",
      children: [
        {
          id: "demo-video",
          name: "Demo Video.mp4",
          type: "file",
          fileType: "video",
          size: "125.4 MB",
          modified: "2 weeks ago",
          url: "https://example.com/demo.mp4",
        },
      ],
    },
    {
      id: "music",
      name: "Music",
      type: "folder",
      children: [
        {
          id: "song1",
          name: "Favorite Song.mp3",
          type: "file",
          fileType: "audio",
          size: "4.2 MB",
          modified: "3 weeks ago",
          url: "https://example.com/song.mp3",
        },
      ],
    },
    {
      id: "spreadsheet",
      name: "Budget 2024.xlsx",
      type: "file",
      fileType: "spreadsheet",
      size: "892 KB",
      modified: "5 days ago",
      url: "https://example.com/budget.xlsx",
    },
    {
      id: "archive",
      name: "Project Archive.zip",
      type: "file",
      fileType: "archive",
      size: "45.6 MB",
      modified: "1 month ago",
      url: "https://example.com/archive.zip",
    },
  ],
}

function getFileIcon(fileType: string) {
  switch (fileType) {
    case "image":
      return <ImageIcon className="w-4 h-4" />
    case "video":
      return <Video className="w-4 h-4" />
    case "audio":
      return <Music className="w-4 h-4" />
    case "archive":
      return <Archive className="w-4 h-4" />
    default:
      return <FileText className="w-4 h-4" />
  }
}

function findItemById(data: any, id: string): any {
  if (data.id === id) return data
  if (data.children) {
    for (const child of data.children) {
      const found = findItemById(child, id)
      if (found) return found
    }
  }
  return null
}

function buildBreadcrumbs(data: any, targetId: string, path: any[] = []): any[] {
  if (data.id === targetId) {
    return [...path, data]
  }
  if (data.children) {
    for (const child of data.children) {
      const result = buildBreadcrumbs(child, targetId, [...path, data])
      if (result.length > 0) return result
    }
  }
  return []
}

export default function Component() {
  const [currentFolderId, setCurrentFolderId] = useState("root")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const currentFolder = findItemById(mockData, currentFolderId)
  const breadcrumbs = buildBreadcrumbs(mockData, currentFolderId)

  const filteredItems =
    currentFolder?.children?.filter((item: any) => item.name.toLowerCase().includes(searchQuery.toLowerCase())) ?? []

  const handleItemClick = (item: any) => {
    if (item.type === "folder") {
      setCurrentFolderId(item.id)
    } else {
      // Open file in new tab
      window.open(item.url, "_blank")
    }
  }

  const handleBreadcrumbClick = (folderId: string) => {
    setCurrentFolderId(folderId)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">Drive</h1>

            {/* Breadcrumbs */}
            <nav className="flex items-center space-x-1 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.id} className="flex items-center">
                  {index === 0 ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleBreadcrumbClick(crumb.id)}
                      className="h-8 px-2 text-gray-400 hover:text-white"
                    >
                      <Home className="w-4 h-4" />
                    </Button>
                  ) : (
                    <>
                      <ChevronRight className="w-4 h-4 text-gray-500 mx-1" />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleBreadcrumbClick(crumb.id)}
                        className="h-8 px-2 text-gray-400 hover:text-white"
                      >
                        {crumb.name}
                      </Button>
                    </>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search in Drive"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
            </div>

            {/* View Toggle */}
            <div className="flex border border-gray-700 rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Upload Button */}
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <Folder className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <p className="text-gray-400">{searchQuery ? "No items match your search" : "This folder is empty"}</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {filteredItems.map((item: any) => (
              <Card
                key={item.id}
                className="bg-gray-800 border-gray-700 hover:bg-gray-750 cursor-pointer transition-colors group"
                onClick={() => handleItemClick(item)}
              >
                <CardContent className="p-4">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 flex items-center justify-center">
                      {item.type === "folder" ? (
                        <Folder className="w-8 h-8 text-blue-400" />
                      ) : (
                        <div className="text-gray-400">{getFileIcon(item.fileType)}</div>
                      )}
                    </div>
                    <div className="w-full">
                      <p className="text-sm font-medium truncate" title={item.name}>
                        {item.name}
                      </p>
                      {item.type === "file" && <p className="text-xs text-gray-400 mt-1">{item.size}</p>}
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                      <DropdownMenuItem className="text-white hover:bg-gray-700">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-white hover:bg-gray-700">
                        <Share className="w-4 h-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-white hover:bg-gray-700">
                        <Star className="w-4 h-4 mr-2" />
                        Add to starred
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-400 hover:bg-gray-700">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Move to trash
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {/* List Header */}
            <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-gray-400 border-b border-gray-800">
              <div className="col-span-6">Name</div>
              <div className="col-span-2">Modified</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-2"></div>
            </div>

            {/* List Items */}
            {filteredItems.map((item: any) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-800 cursor-pointer rounded-md group transition-colors"
                onClick={() => handleItemClick(item)}
              >
                <div className="col-span-6 flex items-center space-x-3">
                  {item.type === "folder" ? (
                    <Folder className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  ) : (
                    <div className="text-gray-400 flex-shrink-0">{getFileIcon(item.fileType)}</div>
                  )}
                  <span className="truncate font-medium">{item.name}</span>
                </div>
                <div className="col-span-2 flex items-center text-sm text-gray-400">{item.modified ?? "-"}</div>
                <div className="col-span-2 flex items-center text-sm text-gray-400">{item.size ?? "-"}</div>
                <div className="col-span-2 flex items-center justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                      <DropdownMenuItem className="text-white hover:bg-gray-700">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-white hover:bg-gray-700">
                        <Share className="w-4 h-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-white hover:bg-gray-700">
                        <Star className="w-4 h-4 mr-2" />
                        Add to starred
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-400 hover:bg-gray-700">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Move to trash
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
