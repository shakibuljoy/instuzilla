import { Calendar, AlarmClockPlus,Search, Settings, LogOut, BookUserIcon, CalendarCheck } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

// Menu items.
const items = [
  {
    title: "Student",
    url: "/dashboard/students/list",
    icon: BookUserIcon,
    
  },
  {
    title: "Attendance",
    url: "/dashboard/attendence/list",
    icon: CalendarCheck,
    
  },
  {
    title: "Give Attendance",
    url: "#",
    icon: AlarmClockPlus,
    sub: [
      {
        title: "8th Business",
        url: "/dashboard/attendence/1",
      },
      {
        title: "7th",
        url: "#",
      },
    ],
  },
  {
    title: "Authetication",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => (

                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                    {item.sub !== undefined &&
                    <SidebarMenuSub>
                      {item.sub.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  }
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarContent>
            
                <SidebarMenuButton asChild isActive>
                    <a href="" className="text-red-500">
                        <LogOut/>
                        <span>Sign Out</span>
                    </a>
                </SidebarMenuButton>
        </SidebarContent>
      </SidebarFooter>
    </Sidebar>
  )
}
