'use client'

import { UserCheck, AlarmClockPlus, Settings, LogOut, BookUserIcon, CalendarCheck, ReceiptText, List } from "lucide-react"

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
import { useContext, useEffect } from "react"
import AuthContext from "../context/AuthContext"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Menu items.


const admin_items = [
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
    title: "Finance",
    url: "#",
    icon: ReceiptText,
    sub: [
      {
        title: "Payment List",
        url: "/dashboard/finance/bill/payment-list",
        icon: List

      }
    ]
  },
  {
    title: "Authetication",
    url: "#",
    icon: UserCheck,
    sub: [
      {
        title: "Login",
        url: "/authentication/login",
      },
      {
        title: "Register",
        url: "/authentication/registration",
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

const student_items = [
  {
    title: "Attendance",
    url: "/dashboard/attendence/list",
    icon: CalendarCheck,
    
  },
  {
    title: "MyAttendence",
    url: "/dashboard/students/99/attendance",
    icon: AlarmClockPlus,
  },
  {
    title: "Finance",
    url: "#",
    icon: ReceiptText,
    sub: [
      {
        title: "Payment List",
        url: "/dashboard/finance/bill/payment-list",

      },
      {
        title: "Bills", 
        url:"/dashboard/finance/bill/99"

      }
    ]
  },
  {
    title: "Authetication",
    url: "#",
    icon: UserCheck,
    sub: [
      {
        title: "Login",
        url: "/authentication/login",
      },
      {
        title: "Register",
        url: "/authentication/registration",
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]


export function AppSidebar() {
  const {user, loading, logOut} = useContext(AuthContext);
  const router = useRouter();

  const items = user?.user_type === 'student' ? student_items : admin_items


  useEffect(() => {
    if(!user &&  !loading){
      return router.push('/authentication/login');
    }
  }, [user, loading])

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
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                    {item.sub !== undefined &&
                    <SidebarMenuSub>
                      {item.sub.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
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
            {
              user && (
                <SidebarMenuButton asChild isActive>
                    <Button onClick={logOut} >
                        <LogOut/>
                        <span  className="text-red-500" >Log Out</span>
                    </Button>
                </SidebarMenuButton>
              )
            }
                
        </SidebarContent>
      </SidebarFooter>
    </Sidebar>
  )
}
